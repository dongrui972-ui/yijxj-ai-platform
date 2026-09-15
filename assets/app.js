(function () {
  'use strict';

  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

  var pages = [
    { key: 'supply', label: '需求集市', href: './supply.html' },
    { key: 'market', label: '免费项目公开', href: './market.html' },
    { key: 'empowerment', label: 'AI能力', href: './empowerment.html' },
    { key: 'members', label: '生态合作', href: './members.html' },
    { key: 'about', label: '关于平台', href: './about.html' }
  ];

  var currentPage = document.body.getAttribute('data-page') || 'home';
  var headerTarget = document.getElementById('siteHeader');
  var footerTarget = document.getElementById('siteFooter');

  if (headerTarget) {
    var homeActive = currentPage === 'home' ? ' is-active' : '';
    var primaryActionLabel = currentPage === 'home' ? '申请免费名额' : '提交AI需求';
    var navItems = '<a class="nav-link' + homeActive + '" href="./index.html">首页</a>' + pages.map(function (page) {
      var active = currentPage === page.key || (currentPage === 'apply' && page.key === 'supply') ? ' is-active' : '';
      return '<a class="nav-link' + active + '" href="' + page.href + '">' + page.label + '</a>';
    }).join('');

    headerTarget.innerHTML = [
      '<a class="skip-link" href="#main">跳至主要内容</a>',
      '<header class="site-header ai-site-header">',
        '<div class="nav-bar"><div class="page-width nav-inner">',
          '<a class="brand" href="./index.html" aria-label="人工智能+软件产业生态联盟首页">',
            '<span class="brand-symbol">AI<span>+</span></span>',
            '<span class="brand-name"><b>人工智能+软件</b><em>产业生态联盟</em></span>',
          '</a>',
          '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primaryNav"><span></span><span></span><span></span><i>菜单</i></button>',
          '<nav class="primary-nav" id="primaryNav" aria-label="主导航">', navItems, '</nav>',
          '<div class="nav-actions">',
            '<a class="member-login" href="./members.html#portal">登录 / 注册</a>',
            '<a class="join-link" href="./apply.html">' + primaryActionLabel + '</a>',
          '</div>',
        '</div></div>',
        '<div class="mobile-actions"><a href="./supply.html#hall">浏览需求</a><a href="./apply.html">提交AI需求</a></div>',
      '</header>'
    ].join('');
  }

  if (footerTarget) {
    footerTarget.innerHTML = [
      '<footer class="site-footer">',
        '<div class="page-width footer-main">',
          '<div class="footer-brand"><div class="brand brand-footer"><span class="brand-symbol">AI<span>+</span></span><span class="brand-name"><b>人工智能+软件</b><em>产业生态联盟</em></span></div>',
            '<p>把企业问题转化为可以验证、可以交付、可以持续使用的人工智能应用。</p>',
            '<a class="footer-primary-link" href="./apply.html">提交AI需求 →</a>',
          '</div>',
          '<div class="footer-column"><b>企业入口</b><a href="./supply.html#hall">查看常态需求集市</a><a href="./market.html">首期免费项目公开</a><a href="./apply.html">申请免费名额</a><a href="./members.html#portal">登录与注册</a></div>',
          '<div class="footer-column"><b>AI项目库</b><a href="./empowerment.html#research-projects">全部AI项目</a><a href="./empowerment.html?kind=application#research-projects">应用类项目</a><a href="./empowerment.html?kind=engineering#research-projects">工程类项目</a><a href="./empowerment.html?kind=engineering&amp;category=evaluation#research-projects">评测与安全能力</a></div>',
          '<div class="footer-column"><b>生态与平台</b><a href="./members.html">生态合作</a><a href="./opensource.html">开源生态</a><a href="./talent.html">人才发展</a><a href="./events.html">活动中心</a><a href="./about.html">关于平台</a></div>',
        '</div>',
        '<div class="page-width footer-disclosure">',
          '<p><b>合作说明：</b>本平台由克拉玛依云计算产业园区与新疆一级芯界人工智能科技有限公司联合建设，园区提供产业与资源协同支持，一级芯界承担技术建设与实施；具体企业项目按照市场化方式开展，相关权责以合作文件和项目协议为准。</p>',
        '</div>',
        '<div class="footer-bottom"><div class="page-width"><span>网站地图 · 隐私声明 · 免责声明 · 收费公示 · 备案信息</span><span>会员登录 · 注册 · 活动报名 · 入会咨询</span></div></div>',
      '</footer>'
    ].join('');
  }

  var quickNav = document.createElement('nav');
  quickNav.className = 'page-quick-nav';
  quickNav.setAttribute('aria-label', '页面快捷导航');
  quickNav.innerHTML = currentPage === 'home'
    ? '<a class="quick-top" href="#main"><span aria-hidden="true">↑</span>回到顶部</a>'
    : [
        '<a class="quick-home" href="./index.html"><span aria-hidden="true">⌂</span>返回首页</a>',
        '<a class="quick-top" href="#main"><span aria-hidden="true">↑</span>回到顶部</a>'
      ].join('');
  document.body.appendChild(quickNav);

  var sideIndex = document.querySelector('.side-index');
  if (sideIndex) {
    var sideIndexLinks = Array.prototype.slice.call(sideIndex.querySelectorAll('a[href^="#"]'));
    var syncSideIndex = function () {
      var activeHash = window.location.hash || (sideIndexLinks[0] && sideIndexLinks[0].hash);
      sideIndexLinks.forEach(function (link) {
        link.classList.toggle('is-current', link.hash === activeHash);
      });
    };
    syncSideIndex();
    window.addEventListener('hashchange', syncSideIndex);
  }

  var techSideNav = document.querySelector('.tech-side-nav');
  if (techSideNav) {
    var techSideLinks = Array.prototype.slice.call(techSideNav.querySelectorAll('a[href^="#"]'));
    var syncTechSideNav = function () {
      var activeHash = window.location.hash || (techSideLinks[0] && techSideLinks[0].hash);
      techSideLinks.forEach(function (link) {
        link.classList.toggle('is-current', link.hash === activeHash);
      });
    };
    syncTechSideNav();
    window.addEventListener('hashchange', syncTechSideNav);
  }

  if (window.location.hash) {
    var scrollToCurrentHash = function () {
      var hashTarget = document.getElementById(window.location.hash.slice(1));
      if (hashTarget) hashTarget.scrollIntoView({ block: 'start' });
    };
    window.setTimeout(scrollToCurrentHash, 80);
    window.addEventListener('load', function () {
      window.setTimeout(scrollToCurrentHash, 120);
    }, { once: true });
    window.addEventListener('pageshow', function () {
      window.setTimeout(scrollToCurrentHash, 240);
    }, { once: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scrollToCurrentHash);
    }
  }

  var menuToggle = document.querySelector('.menu-toggle');
  var primaryNav = document.getElementById('primaryNav');
  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  var heroCarousel = document.querySelector('[data-hero-carousel]');
  if (heroCarousel) {
    var heroSlides = Array.prototype.slice.call(heroCarousel.querySelectorAll('[data-hero-slide]'));
    var heroDots = Array.prototype.slice.call(heroCarousel.querySelectorAll('[data-hero-dot]'));
    var heroPrevious = heroCarousel.querySelector('[data-hero-prev]');
    var heroNext = heroCarousel.querySelector('[data-hero-next]');
    var heroPause = heroCarousel.querySelector('[data-hero-pause]');
    var heroStatus = heroCarousel.querySelector('[data-hero-status]');
    var heroIndex = 0;
    var heroTimer = null;
    var heroPaused = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    heroCarousel.classList.toggle('is-paused', heroPaused);

    function renderHeroSlide(nextIndex) {
      heroIndex = (nextIndex + heroSlides.length) % heroSlides.length;
      heroSlides.forEach(function (slide, index) {
        var isActive = index === heroIndex;
        slide.hidden = !isActive;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });
      heroDots.forEach(function (dot, index) {
        var isActive = index === heroIndex;
        dot.classList.toggle('is-active', isActive);
        if (isActive) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (heroStatus) heroStatus.textContent = String(heroIndex + 1).padStart(2, '0') + ' / ' + String(heroSlides.length).padStart(2, '0');
    }

    function stopHeroTimer() {
      if (heroTimer) window.clearInterval(heroTimer);
      heroTimer = null;
    }

    function startHeroTimer() {
      stopHeroTimer();
      if (!heroPaused && heroSlides.length > 1 && !document.hidden) {
        heroTimer = window.setInterval(function () {
          renderHeroSlide(heroIndex + 1);
        }, 7000);
      }
    }

    function moveHero(direction) {
      renderHeroSlide(heroIndex + direction);
      startHeroTimer();
    }

    if (heroPrevious) heroPrevious.addEventListener('click', function () { moveHero(-1); });
    if (heroNext) heroNext.addEventListener('click', function () { moveHero(1); });
    heroDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        renderHeroSlide(Number(dot.getAttribute('data-hero-dot')) || 0);
        startHeroTimer();
      });
    });
    if (heroPause) {
      heroPause.textContent = heroPaused ? '播放' : '暂停';
      heroPause.setAttribute('aria-label', heroPaused ? '开始自动轮播' : '暂停自动轮播');
      heroPause.addEventListener('click', function () {
        heroPaused = !heroPaused;
        heroCarousel.classList.toggle('is-paused', heroPaused);
        heroPause.textContent = heroPaused ? '播放' : '暂停';
        heroPause.setAttribute('aria-label', heroPaused ? '开始自动轮播' : '暂停自动轮播');
        startHeroTimer();
      });
    }
    heroCarousel.addEventListener('mouseenter', stopHeroTimer);
    heroCarousel.addEventListener('mouseleave', startHeroTimer);
    heroCarousel.addEventListener('focusin', stopHeroTimer);
    heroCarousel.addEventListener('focusout', function (event) {
      if (!heroCarousel.contains(event.relatedTarget)) startHeroTimer();
    });
    document.addEventListener('visibilitychange', startHeroTimer);
    renderHeroSlide(0);
    startHeroTimer();
  }

  var searchLayer = document.querySelector('.search-layer');
  var searchToggle = document.querySelector('.search-toggle');
  var searchClose = document.querySelector('.search-close');
  var searchInput = document.getElementById('siteSearch');
  var openSearch = function () {
    if (!searchLayer) return;
    searchLayer.classList.add('is-open');
    searchLayer.setAttribute('aria-hidden', 'false');
    if (searchInput) searchInput.focus();
  };
  var closeSearch = function () {
    if (!searchLayer) return;
    searchLayer.classList.remove('is-open');
    searchLayer.setAttribute('aria-hidden', 'true');
    if (searchToggle) searchToggle.focus();
  };
  if (searchToggle) searchToggle.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchLayer) {
    searchLayer.addEventListener('click', function (event) {
      if (event.target === searchLayer) closeSearch();
    });
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSearch();
  });
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var value = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.search-links a').forEach(function (link) {
        link.hidden = value && link.textContent.toLowerCase().indexOf(value) === -1;
      });
    });
  }

  document.querySelectorAll('[data-portal-tab]').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var targetId = tab.getAttribute('data-portal-tab');
      document.querySelectorAll('[data-portal-tab]').forEach(function (item) {
        item.classList.toggle('is-active', item === tab);
        item.setAttribute('aria-selected', String(item === tab));
      });
      document.querySelectorAll('.portal-panel').forEach(function (panel) {
        panel.hidden = panel.id !== targetId;
      });
    });
  });

  var marketItems = Array.prototype.slice.call(document.querySelectorAll('[data-market-item]'));
  var marketList = document.querySelector('[data-market-list]');
  var marketTypeFilters = Array.prototype.slice.call(document.querySelectorAll('[data-market-type-filter]'));
  var marketStatusFilter = document.querySelector('[data-market-status-filter]');
  var marketIndustryFilter = document.querySelector('[data-market-industry-filter]');
  var marketSearch = document.querySelector('[data-market-search]');
  var marketSort = document.querySelector('[data-market-sort]');
  var marketCount = document.querySelector('[data-market-count]');
  var marketSelection = document.querySelector('[data-market-selection]');
  var marketEmpty = document.querySelector('[data-market-empty]');
  var marketClear = document.querySelector('[data-market-clear]');
  var activeMarketType = 'all';

  function updateMarketSelection() {
    if (!marketSelection) return;
    var count = document.querySelectorAll('[data-market-item].is-selected').length;
    marketSelection.textContent = '已选 ' + count + ' 条待响应需求';
    marketSelection.hidden = count === 0;
  }

  function sortMarketItems() {
    if (!marketList || !marketItems.length) return;
    var sortMode = marketSort ? marketSort.value : 'recommended';
    var typeOrder = { demand: 1, solution: 2, case: 3, resource: 4 };
    var statusOrder = { open: 1, active: 2, reference: 3, completed: 4, planned: 5 };
    marketItems.sort(function (a, b) {
      if (sortMode === 'title') {
        return (a.getAttribute('data-market-title') || '').localeCompare(b.getAttribute('data-market-title') || '', 'zh-CN');
      }
      if (sortMode === 'type') {
        var typeDifference = (typeOrder[a.getAttribute('data-market-type')] || 9) - (typeOrder[b.getAttribute('data-market-type')] || 9);
        if (typeDifference) return typeDifference;
      }
      if (sortMode === 'status') {
        var statusDifference = (statusOrder[a.getAttribute('data-market-status')] || 9) - (statusOrder[b.getAttribute('data-market-status')] || 9);
        if (statusDifference) return statusDifference;
      }
      return Number(a.getAttribute('data-market-order') || 0) - Number(b.getAttribute('data-market-order') || 0);
    });
    marketItems.forEach(function (item) { marketList.appendChild(item); });
  }

  function applyMarketFilters() {
    if (!marketItems.length) return;
    var keyword = marketSearch ? marketSearch.value.trim().toLowerCase() : '';
    var status = marketStatusFilter ? marketStatusFilter.value : 'all';
    var industry = marketIndustryFilter ? marketIndustryFilter.value : 'all';
    var visibleCount = 0;
    marketItems.forEach(function (item) {
      var typeMatches = activeMarketType === 'all' || item.getAttribute('data-market-type') === activeMarketType;
      var statusMatches = status === 'all' || item.getAttribute('data-market-status') === status;
      var industryMatches = industry === 'all' || item.getAttribute('data-market-industry') === industry;
      var searchText = ((item.getAttribute('data-market-search') || '') + ' ' + item.textContent).toLowerCase();
      var keywordMatches = !keyword || searchText.indexOf(keyword) !== -1;
      item.hidden = !(typeMatches && statusMatches && industryMatches && keywordMatches);
      if (!item.hidden) visibleCount += 1;
    });
    if (marketCount) marketCount.textContent = String(visibleCount);
    if (marketEmpty) marketEmpty.hidden = visibleCount !== 0;
  }

  function setMarketType(selectedType) {
    activeMarketType = selectedType || 'all';
    marketTypeFilters.forEach(function (button) {
      var isActive = button.getAttribute('data-market-type-filter') === activeMarketType;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    applyMarketFilters();
  }

  marketTypeFilters.forEach(function (filterButton) {
    filterButton.addEventListener('click', function () {
      setMarketType(filterButton.getAttribute('data-market-type-filter'));
    });
  });

  if (marketStatusFilter) marketStatusFilter.addEventListener('change', applyMarketFilters);
  if (marketIndustryFilter) marketIndustryFilter.addEventListener('change', applyMarketFilters);
  if (marketSearch) marketSearch.addEventListener('input', applyMarketFilters);
  if (marketSort) marketSort.addEventListener('change', function () {
    sortMarketItems();
    applyMarketFilters();
  });

  if (marketClear) marketClear.addEventListener('click', function () {
    if (marketSearch) marketSearch.value = '';
    if (marketStatusFilter) marketStatusFilter.value = 'all';
    if (marketIndustryFilter) marketIndustryFilter.value = 'all';
    if (marketSort) marketSort.value = 'recommended';
    sortMarketItems();
    setMarketType('all');
    var filterMenu = marketClear.closest('details');
    if (filterMenu) filterMenu.open = false;
  });

  document.querySelectorAll('[data-market-select]').forEach(function (selectButton) {
    selectButton.addEventListener('click', function () {
      var item = selectButton.closest('[data-market-item]');
      if (!item) return;
      var isSelected = item.classList.toggle('is-selected');
      selectButton.setAttribute('aria-pressed', String(isSelected));
      selectButton.textContent = isSelected ? '已加入响应清单' : '我能响应';
      updateMarketSelection();
    });
  });

  if (marketItems.length) {
    var hashType = { '#project-market': 'solution', '#cases': 'case', '#resource-market': 'resource' }[window.location.hash];
    if (hashType) activeMarketType = hashType;
    sortMarketItems();
    setMarketType(activeMarketType);
    updateMarketSelection();
  }

  document.querySelectorAll('[data-community-review]').forEach(function (reviewButton) {
    reviewButton.addEventListener('click', function () {
      var reviewPanel = reviewButton.closest('[data-community-panel]');
      if (!reviewPanel) return;
      var isSelected = reviewButton.classList.toggle('is-selected');
      reviewButton.setAttribute('aria-pressed', String(isSelected));
      var status = reviewPanel.querySelector('[data-community-status]');
      if (status) status.textContent = isSelected ? '已在本次静态原型中标记该意见，正式上线后将登录留痕并公开汇总。' : '请选择你希望参与的评选方式。当前为静态原型，不会提交真实数据。';
    });
  });

  var freeApplication = document.querySelector('[data-free-application]');
  var applicationStatus = document.querySelector('[data-application-status]');
  if (freeApplication) {
    freeApplication.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!freeApplication.reportValidity()) return;
      if (applicationStatus) applicationStatus.textContent = '信息填写完整。当前为静态原型；正式上线后，核验通过的申请将进入需求集市候选区并参加首期项目公开评选。';
    });
  }

  var freeApplicationLookup = document.querySelector('[data-free-application-lookup]');
  var freeApplicationLookupStatus = document.querySelector('[data-free-application-lookup-status]');
  if (freeApplicationLookup) {
    freeApplicationLookup.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!freeApplicationLookup.reportValidity()) return;
      if (freeApplicationLookupStatus) {
        freeApplicationLookupStatus.classList.add('is-result');
        freeApplicationLookupStatus.textContent = '演示查询：申请已提交，下一步为资料核验。正式上线后将按申请编号显示真实进度。';
      }
    });
  }

  var techToolItems = Array.prototype.slice.call(document.querySelectorAll('[data-tech-tool]'));
  var techToolFilters = Array.prototype.slice.call(document.querySelectorAll('[data-tech-filter]'));
  var techToolSearch = document.querySelector('[data-tech-search]');
  var techToolEmpty = document.querySelector('[data-tech-empty]');
  var activeTechFilter = 'all';

  function applyTechToolFilter() {
    var keyword = techToolSearch ? techToolSearch.value.trim().toLowerCase() : '';
    var visibleCount = 0;

    techToolItems.forEach(function (item) {
      var category = item.getAttribute('data-category') || '';
      var searchText = [
        item.getAttribute('data-search') || '',
        item.textContent || ''
      ].join(' ').toLowerCase();
      var categoryMatches = activeTechFilter === 'all' || category === activeTechFilter;
      var keywordMatches = !keyword || searchText.indexOf(keyword) !== -1;
      var isVisible = categoryMatches && keywordMatches;

      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (techToolEmpty) techToolEmpty.hidden = visibleCount !== 0;
  }

  function setTechToolFilter(filterName) {
    activeTechFilter = filterName || 'all';
    techToolFilters.forEach(function (button) {
      var isActive = button.getAttribute('data-tech-filter') === activeTechFilter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
    applyTechToolFilter();
  }

  techToolFilters.forEach(function (filterButton) {
    filterButton.addEventListener('click', function () {
      setTechToolFilter(filterButton.getAttribute('data-tech-filter'));
    });
  });

  if (techToolSearch) {
    techToolSearch.addEventListener('input', applyTechToolFilter);
  }

  if (techToolItems.length) {
    setTechToolFilter('all');
  }

  var publicProjects = Array.prototype.slice.call(document.querySelectorAll('[data-public-project]'));
  var applicationCapacity = document.querySelector('[data-application-capacity]');
  if (applicationCapacity) {
    var applicationTotal = Number(applicationCapacity.getAttribute('data-total')) || 10;
    var applicationApplied = publicProjects.length;
    var applicationRemaining = Math.max(applicationTotal - applicationApplied, 0);
    applicationCapacity.querySelectorAll('[data-application-applied]').forEach(function (item) {
      item.textContent = String(applicationApplied);
    });
    applicationCapacity.querySelectorAll('[data-application-total]').forEach(function (item) {
      item.textContent = String(applicationTotal);
    });
    applicationCapacity.querySelectorAll('[data-application-remaining]').forEach(function (item) {
      item.textContent = String(applicationRemaining);
    });
    var capacityProgress = applicationCapacity.querySelector('[data-application-progress]');
    if (capacityProgress) {
      capacityProgress.max = applicationTotal;
      capacityProgress.value = Math.min(applicationApplied, applicationTotal);
      capacityProgress.setAttribute('aria-label', '已申请' + applicationApplied + '个，共' + applicationTotal + '个免费名额');
    }
  }
  var projectFilters = Array.prototype.slice.call(document.querySelectorAll('[data-project-filter]'));
  var projectSearch = document.querySelector('[data-public-project-search]');
  var projectEmpty = document.querySelector('[data-project-empty]');
  var activeProjectStatus = 'all';

  function applyPublicProjectFilters() {
    var keyword = projectSearch ? projectSearch.value.trim().toLowerCase() : '';
    var visibleCount = 0;

    publicProjects.forEach(function (projectCard) {
      var projectStatus = projectCard.getAttribute('data-status') || '';
      var searchText = [
        projectCard.getAttribute('data-search') || '',
        projectCard.textContent || ''
      ].join(' ').toLowerCase();
      var matchesStatus = activeProjectStatus === 'all' || projectStatus === activeProjectStatus;
      var matchesKeyword = !keyword || searchText.indexOf(keyword) !== -1;
      var isVisible = matchesStatus && matchesKeyword;

      projectCard.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (projectEmpty) projectEmpty.hidden = visibleCount !== 0;
  }

  projectFilters.forEach(function (filterButton) {
    filterButton.addEventListener('click', function () {
      activeProjectStatus = filterButton.getAttribute('data-project-filter') || 'all';
      projectFilters.forEach(function (item) {
        item.classList.toggle('is-active', item === filterButton);
        item.setAttribute('aria-pressed', item === filterButton ? 'true' : 'false');
      });
      applyPublicProjectFilters();
    });
  });

  if (projectSearch) {
    projectSearch.addEventListener('input', applyPublicProjectFilters);
  }

  if (publicProjects.length) {
    projectFilters.forEach(function (item) {
      item.setAttribute('aria-pressed', item.classList.contains('is-active') ? 'true' : 'false');
    });
    applyPublicProjectFilters();
  }

  var repoProjectTabs = Array.prototype.slice.call(document.querySelectorAll('.repo-project-tabs a'));

  function setActiveRepoProjectTab(hash) {
    var requestedHash = hash || '#overview';
    var matchedTab = repoProjectTabs.filter(function (tabLink) {
      return tabLink.getAttribute('href') === requestedHash;
    })[0] || repoProjectTabs[0];

    repoProjectTabs.forEach(function (tabLink) {
      var isActive = tabLink === matchedTab;
      tabLink.classList.toggle('is-active', isActive);
      if (isActive) tabLink.setAttribute('aria-current', 'page');
      else tabLink.removeAttribute('aria-current');
    });
  }

  repoProjectTabs.forEach(function (tabLink) {
    tabLink.addEventListener('click', function () {
      setActiveRepoProjectTab(tabLink.getAttribute('href'));
    });
  });

  if (repoProjectTabs.length) {
    setActiveRepoProjectTab(window.location.hash);
    window.addEventListener('hashchange', function () {
      setActiveRepoProjectTab(window.location.hash);
    });
  }
}());
