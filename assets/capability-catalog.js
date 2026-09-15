(function () {
  'use strict';

  var applications = (window.XJResearchProjects || []).map(function (project) {
    return Object.assign({}, project, {
      kind: 'application',
      kindLabel: '应用类',
      detailUrl: './research-detail.html?id=' + encodeURIComponent(project.id),
      tags: project.tags || project.route.slice(0, 3)
    });
  });
  var engineering = (window.XJEngineeringProjects || []).map(function (project) {
    return Object.assign({}, project, {
      kind: 'engineering',
      kindLabel: '工程类',
      detailUrl: './engineering-detail.html?id=' + encodeURIComponent(project.id)
    });
  });
  var projects = applications.concat(engineering);
  var list = document.querySelector('[data-catalog-list]');
  if (!list) return;

  var kindButtons = Array.prototype.slice.call(document.querySelectorAll('[data-catalog-kind]'));
  var categorySelect = document.querySelector('[data-catalog-category]');
  var searchInput = document.querySelector('[data-catalog-search]');
  var resultsTitle = document.querySelector('[data-catalog-results-title]');
  var resultsCount = document.querySelector('[data-catalog-results-count]');
  var resultsHint = document.querySelector('[data-catalog-results-hint]');
  var emptyState = document.querySelector('[data-catalog-empty]');
  var params = new URLSearchParams(window.location.search);
  var validKinds = ['all', 'application', 'engineering'];
  var state = {
    kind: validKinds.indexOf(params.get('kind')) >= 0 ? params.get('kind') : 'all',
    category: 'all',
    query: params.get('q') || ''
  };

  var kindNames = { all: '全部项目', application: '应用类项目', engineering: '工程类项目' };
  var categories = {
    application: [
      ['enterprise', '企业通用'],
      ['culture', '文化产业'],
      ['voyage', '航空航运'],
      ['agriculture', '农业']
    ],
    engineering: [
      ['model', '模型与视觉'],
      ['data', '数据与知识'],
      ['agent', '智能体应用'],
      ['training', '训练与运维'],
      ['delivery', '部署与加速'],
      ['evaluation', '评测与安全']
    ]
  };

  var escapeHtml = function (value) {
    return String(value || '').replace(/[&<>'"]/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char];
    });
  };

  function syncCounts() {
    document.querySelectorAll('[data-kind-count]').forEach(function (node) {
      var kind = node.getAttribute('data-kind-count');
      node.textContent = String(kind === 'all' ? projects.length : projects.filter(function (item) { return item.kind === kind; }).length);
    });
  }

  function availableCategories() {
    if (state.kind === 'application') return [{ group: '应用方向', values: categories.application }];
    if (state.kind === 'engineering') return [{ group: '工程方向', values: categories.engineering }];
    return [
      { group: '应用方向', values: categories.application },
      { group: '工程方向', values: categories.engineering }
    ];
  }

  function renderCategoryOptions() {
    if (!categorySelect) return;
    var current = state.category;
    categorySelect.innerHTML = '<option value="all">全部方向</option>' + availableCategories().map(function (group) {
      return '<optgroup label="' + escapeHtml(group.group) + '">' + group.values.map(function (item) {
        var value = (state.kind === 'all' ? (group.group === '应用方向' ? 'application:' : 'engineering:') : '') + item[0];
        return '<option value="' + escapeHtml(value) + '">' + escapeHtml(item[1]) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
    var hasCurrent = Array.prototype.some.call(categorySelect.options, function (option) { return option.value === current; });
    state.category = hasCurrent ? current : 'all';
    categorySelect.value = state.category;
  }

  function categoryMatches(project) {
    if (state.category === 'all') return true;
    if (state.category.indexOf(':') > -1) {
      var parts = state.category.split(':');
      return project.kind === parts[0] && project.categoryKey === parts[1];
    }
    return project.categoryKey === state.category;
  }

  function queryMatches(project) {
    var query = state.query.trim().toLowerCase();
    if (!query) return true;
    var source = [project.code, project.kindLabel, project.category, project.stage, project.title, project.summary, (project.tags || []).join(' '), (project.deliverables || []).join(' ')].join(' ').toLowerCase();
    return source.indexOf(query) >= 0;
  }

  function visibleProjects() {
    return projects.filter(function (project) {
      var kindMatch = state.kind === 'all' || project.kind === state.kind;
      return kindMatch && categoryMatches(project) && queryMatches(project);
    });
  }

  function cardTemplate(project) {
    var outcome = (project.deliverables || []).slice(0, 2).join(' · ');
    var tags = (project.tags || []).slice(0, 3);
    return '<a class="capability-project-card" data-project-kind="' + escapeHtml(project.kind) + '" data-project-category="' + escapeHtml(project.categoryKey) + '" href="' + escapeHtml(project.detailUrl) + '">' +
      '<div class="capability-card-top"><span class="capability-kind-chip">' + escapeHtml(project.kindLabel) + '</span><b>' + escapeHtml(project.stage) + '</b></div>' +
      '<div class="capability-card-code">' + escapeHtml(project.code) + ' · ' + escapeHtml(project.category) + '</div>' +
      '<h2>' + escapeHtml(project.title) + '</h2>' +
      '<p>' + escapeHtml(project.summary) + '</p>' +
      '<div class="capability-card-outcome"><span>' + (project.kind === 'engineering' ? '工程交付' : '项目成果') + '</span><strong>' + escapeHtml(outcome) + '</strong></div>' +
      '<div class="capability-card-tags">' + tags.map(function (tag) { return '<span>' + escapeHtml(tag) + '</span>'; }).join('') + '</div>' +
      '<footer><span>' + escapeHtml(project.maturity) + '</span><strong>查看详情 →</strong></footer>' +
    '</a>';
  }

  function syncUrl() {
    var next = new URL(window.location.href);
    if (state.kind === 'all') next.searchParams.delete('kind'); else next.searchParams.set('kind', state.kind);
    if (state.category === 'all') next.searchParams.delete('category'); else next.searchParams.set('category', state.category);
    if (!state.query.trim()) next.searchParams.delete('q'); else next.searchParams.set('q', state.query.trim());
    window.history.replaceState(null, '', next.pathname + next.search + '#research-projects');
  }

  function render() {
    var visible = visibleProjects();
    list.innerHTML = visible.map(cardTemplate).join('');
    kindButtons.forEach(function (button) {
      var selected = button.getAttribute('data-catalog-kind') === state.kind;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    if (resultsTitle) resultsTitle.textContent = kindNames[state.kind];
    if (resultsCount) resultsCount.textContent = String(visible.length);
    if (resultsHint) {
      var categoryText = categorySelect && categorySelect.selectedOptions.length ? categorySelect.selectedOptions[0].textContent : '全部方向';
      resultsHint.textContent = categoryText + (state.query.trim() ? ' · 搜索“' + state.query.trim() + '”' : '') + ' · 按当前公开成熟度展示';
    }
    if (emptyState) emptyState.hidden = visible.length !== 0;
    syncUrl();
  }

  syncCounts();
  renderCategoryOptions();
  if (searchInput) {
    searchInput.value = state.query;
    searchInput.addEventListener('input', function () {
      state.query = searchInput.value;
      render();
    });
  }
  if (categorySelect) {
    var initialCategory = params.get('category');
    if (initialCategory && Array.prototype.some.call(categorySelect.options, function (option) { return option.value === initialCategory; })) {
      state.category = initialCategory;
      categorySelect.value = initialCategory;
    }
    categorySelect.addEventListener('change', function () {
      state.category = categorySelect.value;
      render();
    });
  }
  kindButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      state.kind = button.getAttribute('data-catalog-kind') || 'all';
      state.category = 'all';
      renderCategoryOptions();
      render();
    });
  });
  render();
})();
