const state = {
  data: null,
  roleId: null,
  grade: null,
  skillId: null,
  openReqSkill: null,
};

const $ = (sel) => document.querySelector(sel);

async function load() {
  const res = await fetch("./data/matrix.json");
  if (!res.ok) throw new Error("Не удалось загрузить matrix.json");
  state.data = await res.json();
  state.roleId = state.data.roles[0]?.id;
  state.grade = state.data.roles[0]?.grades[0]?.grade;
  bindNav();
  renderRoles();
  renderMatrix();
  renderSkills();
  renderGuide();
}

function bindNav() {
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("is-active"));
      document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-visible"));
      btn.classList.add("is-active");
      $(`#view-${btn.dataset.view}`).classList.add("is-visible");
    });
  });
}

function skillById(id) {
  return state.data.skills.find((s) => s.id === id);
}

function roleById(id) {
  return state.data.roles.find((r) => r.id === id);
}

function getRoleHint(roleId, skillId, level) {
  return roleById(roleId)?.assessment?.[skillId]?.[String(level)] || null;
}

function hasRoleHints(roleId, skillId) {
  return Boolean(roleById(roleId)?.assessment?.[skillId]);
}

function paintRoleTabs(container) {
  if (!container) return;
  container.innerHTML = "";
  state.data.roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `role-tab${role.id === state.roleId ? " is-active" : ""}`;
    btn.textContent = role.name_ru || role.name;
    btn.setAttribute("aria-selected", role.id === state.roleId ? "true" : "false");
    btn.addEventListener("click", () => {
      if (role.id === state.roleId) return;
      state.roleId = role.id;
      state.grade = role.grades[0]?.grade;
      state.openReqSkill = null;
      renderRoles();
      renderMatrix();
    });
    container.appendChild(btn);
  });
}

function renderRoles() {
  paintRoleTabs($("#role-tabs"));

  const role = roleById(state.roleId);
  if (!role) return;

  const grade =
    role.grades.find((g) => g.grade === state.grade) || role.grades[0];

  $("#role-panel").innerHTML = `
    <article class="role-head">
      <h2>${role.name_ru}</h2>
      <p>${role.description}</p>
      <div class="grade-switch">
        ${role.grades
          .map(
            (g) => `
          <button type="button" class="grade-chip${g.grade === grade.grade ? " is-active" : ""}" data-grade="${g.grade}">
            ${capitalize(g.grade)}
          </button>`
          )
          .join("")}
      </div>
      <p class="muted" style="margin-top:14px">${grade.summary}</p>
      <p class="hint-callout">Откройте навык ниже: рядом с уровнями — рекомендации, <em>что проверять именно для ${role.name_ru}</em>.</p>
    </article>
    <div class="req-cards" id="req-cards">
      ${grade.requirements
        .map((r) => renderRequirementCard(role, r))
        .join("")}
    </div>
  `;

  $("#role-panel").querySelectorAll(".grade-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.grade = chip.dataset.grade;
      state.openReqSkill = null;
      renderRoles();
    });
  });

  $("#role-panel").querySelectorAll("[data-open-skill]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.openSkill;
      state.openReqSkill = state.openReqSkill === id ? null : id;
      renderRoles();
      // keep scroll near opened card
      requestAnimationFrame(() => {
        document
          .querySelector(`[data-card-skill="${state.openReqSkill}"]`)
          ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  });
}

function renderRequirementCard(role, req) {
  const skill = skillById(req.skill_id);
  const open = state.openReqSkill === req.skill_id;
  const roleSpecific = hasRoleHints(role.id, req.skill_id);
  const levels = skill?.levels_detail || [];

  return `
    <article class="req-card${open ? " is-open" : ""}" data-card-skill="${req.skill_id}">
      <button type="button" class="req-card-head" data-open-skill="${req.skill_id}" aria-expanded="${open}">
        <div class="req-card-title">
          <span class="skill-code">${req.skill_id}</span>
          <strong>${skill?.name_ru || req.skill_id}</strong>
          <span class="priority ${req.priority}">${req.priority}</span>
          ${
            roleSpecific
              ? `<span class="badge-role">есть рекомендации для роли</span>`
              : `<span class="badge-generic">только SFIA</span>`
          }
        </div>
        <div class="req-card-meta">
          <span class="level-pill">нужен ≥ L${req.min_level} · ${levelTitle(req.min_level)}</span>
          <span class="chevron">${open ? "▴" : "▾"}</span>
        </div>
      </button>
      ${
        req.notes
          ? `<p class="req-note">${escapeHtml(req.notes)}</p>`
          : ""
      }
      ${
        open
          ? `<div class="req-card-body">
              <p class="muted">SFIA описывает общий смысл уровня. Блок «Рекомендации по оценке» — как проверить соответствие для <strong>${escapeHtml(role.name_ru)}</strong>.</p>
              <div class="level-stack">
                ${levels
                  .map((l) =>
                    renderLevelBlock(role, skill, l, req.min_level)
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }
    </article>
  `;
}

function renderLevelBlock(role, skill, levelDetail, targetLevel) {
  const hint = getRoleHint(role.id, skill.id, levelDetail.level);
  const isTarget = levelDetail.level === targetLevel;
  const isAboveOrEqual = levelDetail.level >= targetLevel;

  return `
    <section class="level-block${isTarget ? " is-target" : ""}${!isAboveOrEqual ? " is-below" : ""}">
      <header class="level-block-head">
        <strong>L${levelDetail.level} · ${levelDetail.title}</strong>
        ${isTarget ? `<span class="target-tag">порог грейда</span>` : ""}
      </header>
      <p class="sfia-text"><span class="label-mini">SFIA</span> ${escapeHtml(levelDetail.text)}</p>
      ${
        hint
          ? `<div class="role-hint">
              <h4>Рекомендации по оценке · ${escapeHtml(role.name_ru)}</h4>
              <p class="label-mini">Что проверять</p>
              <ul>${hint.check.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>
              <p class="label-mini">Примеры артефактов</p>
              <ul class="artifacts">${hint.artifacts.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
            </div>`
          : hasRoleHints(role.id, skill.id)
            ? `<p class="muted small">Для этого уровня ролевых рекомендаций пока нет — ориентируйтесь на текст SFIA.</p>`
            : `<p class="muted small">Ролевой специфики нет: критерии универсальны (SFIA).</p>`
      }
    </section>
  `;
}

function roleSkillIds(role) {
  const seen = new Set();
  for (const grade of role.grades) {
    for (const req of grade.requirements) seen.add(req.skill_id);
  }
  return state.data.skills.map((s) => s.id).filter((id) => seen.has(id));
}

function renderMatrix() {
  paintRoleTabs($("#matrix-role-tabs"));
  const role = roleById(state.roleId);
  const panel = $("#matrix-panel");
  if (!role || !panel) return;

  const skillIds = roleSkillIds(role);
  const headerCells = role.grades
    .map((g) => `<th scope="col">${escapeHtml(capitalize(g.grade))}</th>`)
    .join("");
  const rows = skillIds
    .map((skillId) => {
      const skill = skillById(skillId);
      const cells = role.grades
        .map((g) => {
          const req = g.requirements.find((r) => r.skill_id === skillId);
          if (!req) {
            return `<td class="matrix-empty"><span class="matrix-dash" aria-label="нет требования">—</span></td>`;
          }
          return `<td class="is-${req.priority}">
            <span class="matrix-level">L${req.min_level}</span>
            <span class="priority ${req.priority}">${req.priority}</span>
          </td>`;
        })
        .join("");
      return `<tr>
        <th scope="row">
          <span class="skill-code">${escapeHtml(skillId)}</span>
          <span class="matrix-skill-name">${escapeHtml(skill?.name_ru || skillId)}</span>
        </th>
        ${cells}
      </tr>`;
    })
    .join("");

  panel.innerHTML = `
    <div class="matrix-card">
      <div class="matrix-card-head">
        <h3>${escapeHtml(role.name_ru)}</h3>
        <p class="muted">Уровень SFIA и приоритет для каждого грейда. Пустая ячейка — навык на этом грейде не требуется.</p>
      </div>
      <div class="matrix-scroll">
        <table class="grade-matrix">
          <thead>
            <tr>
              <th scope="col">Навык</th>
              ${headerCells}
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </div>
  `;
}

function renderSkills() {
  const grid = $("#skills-grid");
  grid.innerHTML = state.data.skills
    .map(
      (s) => `
    <button type="button" class="skill-card${state.skillId === s.id ? " is-active" : ""}" data-skill="${s.id}">
      <div class="code">${s.id}</div>
      <h3>${s.name_ru}</h3>
      <p>${s.summary_ru}</p>
    </button>`
    )
    .join("");

  grid.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.skillId = card.dataset.skill;
      renderSkills();
      renderSkillDetail();
    });
  });

  if (state.skillId) renderSkillDetail();
}

function renderSkillDetail() {
  const skill = skillById(state.skillId);
  const el = $("#skill-detail");
  if (!skill) {
    el.hidden = true;
    return;
  }

  const roleHintsHtml = state.data.roles
    .map((role) => {
      const hints = role.assessment?.[skill.id];
      if (!hints) return "";
      const levels = Object.keys(hints)
        .sort((a, b) => Number(a) - Number(b))
        .map((lvl) => {
          const h = hints[lvl];
          return `<div class="mini-level"><strong>L${lvl}</strong>: ${escapeHtml(h.check[0] || "")}${h.check.length > 1 ? "…" : ""}</div>`;
        })
        .join("");
      return `<div class="compare-card"><h3>${escapeHtml(role.name_ru)}</h3>${levels}<p class="muted small">Полные рекомендации — во вкладке «Роли».</p></div>`;
    })
    .filter(Boolean)
    .join("");

  el.hidden = false;
  el.innerHTML = `
    <p class="muted">${skill.id} · SFIA 9 · уровни ${skill.levels.join(", ")}</p>
    <h2>${skill.name_ru}</h2>
    <p>${skill.summary_ru}</p>
    <p style="margin-top:10px"><a href="${skill.sfia_url}" target="_blank" rel="noreferrer">Официальное описание SFIA →</a></p>
    <div class="levels">
      ${skill.levels_detail
        .map(
          (l) => `
        <div class="level-row">
          <strong>L${l.level} · ${l.title}</strong>
          <div>${escapeHtml(l.text)}</div>
        </div>`
        )
        .join("")}
    </div>
    ${
      roleHintsHtml
        ? `<h3 class="section-sub">Где есть ролевые рекомендации</h3><div class="compare">${roleHintsHtml}</div>`
        : `<p class="muted" style="margin-top:18px">Для этого навыка ролевых рекомендаций нет — критерии универсальны.</p>`
    }
  `;
}

function renderGuide() {
  const guide = state.data.assessment_guide;
  $("#guide-content").innerHTML = guide.sections
    .map(
      (s) => `
    <article class="guide-card">
      <h3>${s.title}</h3>
      <p>${escapeHtml(s.body)}</p>
    </article>`
    )
    .join("");
}

function levelTitle(level) {
  return (
    {
      1: "Follow",
      2: "Assist",
      3: "Apply",
      4: "Enable",
      5: "Ensure, advise",
      6: "Initiate, influence",
    }[level] || ""
  );
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

load().catch((err) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<p style="color:#a14b1f">Ошибка загрузки: ${err.message}</p>`
  );
});
