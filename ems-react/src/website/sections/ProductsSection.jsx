import { useCallback, useEffect, useMemo, useState } from 'react';
import { productData } from '../data/productData.js';
import { productListings } from '../data/productListings.js';
import { buildCircuitSVG, getStandardByCategory } from '../lib/circuitSvg.js';

const FILTER_KEYS = ['category', 'brand', 'rating', 'voltage', 'application'];

function StarIcons({ stars }) {
  return (
    <>
      {stars.map((k, i) => {
        if (k === 'full') return <i key={i} className="fas fa-star" />;
        if (k === 'half') return <i key={i} className="fas fa-star-half-alt" />;
        return <i key={i} className="far fa-star" />;
      })}
    </>
  );
}

function matchesListing(listing, filters, searchTerm) {
  const f = listing.filter;
  const matchCategory = !filters.category.length || filters.category.some((v) => f.category === v);
  const matchBrand = !filters.brand.length || filters.brand.some((v) => f.brand === v);
  const matchRating = !filters.rating.length || filters.rating.some((v) => f.rating === v);
  const matchVoltage = !filters.voltage.length || filters.voltage.some((v) => f.voltage === v);
  const matchApplication =
    !filters.application.length ||
    filters.application.some((v) => f.application === v || f.application.includes(v));
  const n = searchTerm.toLowerCase().trim();
  const matchSearch =
    !n ||
    f.name.toLowerCase().includes(n) ||
    listing.shortDesc.toLowerCase().includes(n) ||
    listing.brand.toLowerCase().includes(n);
  return matchCategory && matchBrand && matchRating && matchVoltage && matchApplication && matchSearch;
}

function sortListings(list, sortVal) {
  const copy = [...list];
  if (sortVal === 'name-asc') copy.sort((a, b) => (a.filter.name || '').localeCompare(b.filter.name || ''));
  else if (sortVal === 'name-desc') copy.sort((a, b) => (b.filter.name || '').localeCompare(a.filter.name || ''));
  else if (sortVal === 'price-asc') copy.sort((a, b) => a.filter.price - b.filter.price);
  else if (sortVal === 'price-desc') copy.sort((a, b) => b.filter.price - a.filter.price);
  else if (sortVal === 'rating') {
    copy.sort((a, b) => {
      const ra = a.stars.filter((s) => s === 'full').length + (a.stars.includes('half') ? 0.5 : 0);
      const rb = b.stars.filter((s) => s === 'full').length + (b.stars.includes('half') ? 0.5 : 0);
      return rb - ra;
    });
  }
  return copy;
}

export function ProductsSection() {
  const [filters, setFilters] = useState(() =>
    FILTER_KEYS.reduce((acc, k) => {
      acc[k] = [];
      return acc;
    }, {})
  );
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortSelect, setSortSelect] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [flipped, setFlipped] = useState({});
  const [quoteItems, setQuoteItems] = useState([]);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quickViewId, setQuickViewId] = useState(null);
  const [quoteFlash, setQuoteFlash] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 200);
    return () => clearTimeout(t);
  }, [search]);

  const filtered = useMemo(
    () => productListings.filter((p) => matchesListing(p, filters, debouncedSearch)),
    [filters, debouncedSearch]
  );

  const sorted = useMemo(() => sortListings(filtered, sortSelect), [filtered, sortSelect]);

  const toggleFilter = useCallback((group, value) => {
    setFilters((prev) => {
      const arr = prev[group] || [];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      return { ...prev, [group]: next };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(FILTER_KEYS.reduce((acc, k) => ({ ...acc, [k]: [] }), {}));
  }, []);

  const resetAll = useCallback(() => {
    clearFilters();
    setSearch('');
  }, [clearFilters]);

  const addToQuote = useCallback((name) => {
    setQuoteItems((prev) => (prev.includes(name) ? prev : [...prev, name]));
    setQuoteFlash((f) => ({ ...f, [name]: true }));
    setTimeout(() => setQuoteFlash((f) => ({ ...f, [name]: false })), 2000);
    setQuoteOpen(true);
  }, []);

  const removeFromQuote = useCallback((name) => {
    setQuoteItems((prev) => prev.filter((p) => p !== name));
  }, []);

  const clearQuote = useCallback(() => setQuoteItems([]), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setQuoteOpen(false);
        setQuickViewId(null);
        document.body.style.overflow = '';
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = quickViewId ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewId]);

  const qv = quickViewId ? productData[quickViewId] : null;

  return (
    <>
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Electrical Panels</h2>
            <div className="header-line"></div>
            <p>Premium distribution boards, switchgear & panel solutions for every application</p>
          </div>

          <div className="products-toolbar">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                type="text"
                id="productSearch"
                placeholder="Search electrical panels..."
                autoComplete="off"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="toolbar-right">
              <span className="results-count">
                <span id="visibleCount">{sorted.length}</span> products found
              </span>
              <div className="sort-select">
                <select id="sortSelect" value={sortSelect} onChange={(e) => setSortSelect(e.target.value)}>
                  <option value="default">Sort by: Featured</option>
                  <option value="name-asc">Name: A → Z</option>
                  <option value="name-desc">Name: Z → A</option>
                  <option value="price-asc">Price: Low → High</option>
                  <option value="price-desc">Price: High → Low</option>
                  <option value="rating">Best Rated</option>
                </select>
              </div>
              <div className="view-toggle">
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  data-view="grid"
                  title="Grid View"
                  onClick={() => setViewMode('grid')}
                >
                  <i className="fas fa-th"></i>
                </button>
                <button
                  type="button"
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  data-view="list"
                  title="List View"
                  onClick={() => setViewMode('list')}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="products-layout">
            <aside className="products-sidebar">
              <div className="filter-header">
                <h3>
                  <i className="fas fa-sliders-h"></i> Filter By
                </h3>
                <button type="button" id="clearFilters" className="clear-filters-btn" onClick={clearFilters}>
                  Clear All
                </button>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Category</h4>
                <div className="filter-options">
                  {[
                    ['mdb', 'Main Distribution Boards', '4'],
                    ['sdb', 'Sub Distribution Boards', '4'],
                    ['mcc', 'Motor Control Centers', '3'],
                    ['lv-panel', 'LV Switchgear Panels', '3'],
                    ['mcb-panel', 'MCB Distribution', '2'],
                  ].map(([val, label, count]) => (
                    <label key={val} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={val}
                        name="category"
                        checked={filters.category.includes(val)}
                        onChange={() => toggleFilter('category', val)}
                      />{' '}
                      {label}
                      <span className="filter-count">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Brand</h4>
                <div className="filter-options">
                  {[
                    ['siemens', 'Siemens', '5'],
                    ['abb', 'ABB', '4'],
                  ].map(([val, label, count]) => (
                    <label key={val} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={val}
                        name="brand"
                        checked={filters.brand.includes(val)}
                        onChange={() => toggleFilter('brand', val)}
                      />{' '}
                      {label}
                      <span className="filter-count">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Current Rating</h4>
                <div className="filter-options">
                  {[
                    ['up-to-63A', 'Up to 63A', '5'],
                    ['100-250A', '100A – 250A', '6'],
                    ['400-630A', '400A – 630A', '3'],
                    ['above-800A', 'Above 800A', '2'],
                  ].map(([val, label, count]) => (
                    <label key={val} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={val}
                        name="rating"
                        checked={filters.rating.includes(val)}
                        onChange={() => toggleFilter('rating', val)}
                      />{' '}
                      {label}
                      <span className="filter-count">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Voltage</h4>
                <div className="filter-options">
                  {[
                    ['lv-400v', 'LV — 400V AC', '12'],
                    ['mv-11kv', 'MV — 11kV', '4'],
                  ].map(([val, label, count]) => (
                    <label key={val} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={val}
                        name="voltage"
                        checked={filters.voltage.includes(val)}
                        onChange={() => toggleFilter('voltage', val)}
                      />{' '}
                      {label}
                      <span className="filter-count">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h4 className="filter-title">Application</h4>
                <div className="filter-options">
                  {[
                    ['industrial', 'Industrial', '6'],
                    ['commercial', 'Commercial', '5'],
                    ['residential', 'Residential', '3'],
                    ['utility', 'Utility & Infrastructure', '2'],
                  ].map(([val, label, count]) => (
                    <label key={val} className="filter-checkbox">
                      <input
                        type="checkbox"
                        value={val}
                        name="application"
                        checked={filters.application.includes(val)}
                        onChange={() => toggleFilter('application', val)}
                      />{' '}
                      {label}
                      <span className="filter-count">{count}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-cta">
                <i className="fas fa-headset"></i>
                <p>Need a custom panel solution?</p>
                <a href="#contact" className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>
                  Request a Quote
                </a>
              </div>
            </aside>

            <div className="products-content">
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`} id="productsGrid">
                {sorted.map((listing) => {
                  const d = listing.filter;
                  const isFlipped = !!flipped[listing.id];
                  const cat = d.category;
                  const standard = getStandardByCategory(cat);
                  const pd = productData[listing.id];
                  return (
                    <div
                      key={listing.id}
                      className={`product-card ${isFlipped ? 'flipped' : ''}`}
                      data-category={d.category}
                      data-brand={d.brand}
                      data-rating={d.rating}
                      data-voltage={d.voltage}
                      data-application={d.application}
                      data-price={String(d.price)}
                      data-name={d.name}
                    >
                      <div className={`product-badge ${listing.badge.className}`}>{listing.badge.text}</div>
                      <div className="card-inner">
                        <div className="card-front">
                          <div className="product-image">
                            <div className="product-icon">
                              <i className={`fas ${listing.icon}`}></i>
                            </div>
                            <div className="product-overlay">
                              <button
                                type="button"
                                className="overlay-btn quick-view-btn"
                                data-product={listing.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickViewId(listing.id);
                                }}
                              >
                                <i className="fas fa-eye"></i> Quick View
                              </button>
                            </div>
                          </div>
                          <div className="product-info">
                            <div className="product-brand">{listing.brand}</div>
                            <h3 className="product-name">{listing.title}</h3>
                            <p className="product-desc">{listing.shortDesc}</p>
                            <div className="product-specs">
                              {listing.specTags.map((t) => (
                                <span key={t} className="spec-tag">
                                  {t}
                                </span>
                              ))}
                            </div>
                            <div className="product-rating">
                              <StarIcons stars={listing.stars} />
                              <span>{listing.reviews}</span>
                            </div>
                            <div className="product-footer">
                              <div className="product-price">
                                {listing.price.kind === 'single' ? (
                                  <>
                                    <span className="price-label">{listing.price.label}</span>
                                    <span className="price-value">{listing.price.value}</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="price-old">{listing.price.old}</span>
                                    <span className="price-value">{listing.price.value}</span>
                                  </>
                                )}
                              </div>
                              <button
                                type="button"
                                className={`add-to-quote-btn ${quoteFlash[listing.quoteName] ? 'added' : ''}`}
                                data-product={listing.quoteName}
                                onClick={() => addToQuote(listing.quoteName)}
                              >
                                <i className="fas fa-plus"></i> Add to Quote
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="card-back">
                          <div
                            className="circuit-svg-wrap"
                            dangerouslySetInnerHTML={{ __html: buildCircuitSVG(cat, d.brand) }}
                          />
                          <div className="card-back-info">
                            <div className="card-back-title">{pd?.name || listing.title}</div>
                            <div className="card-back-standard">{standard}</div>
                            <div className="card-back-hint">
                              <i className="fas fa-sync-alt"></i> Tap button to flip back
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="card-flip-btn"
                        title={isFlipped ? 'View Details' : 'View Circuit Diagram'}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlipped((prev) => ({ ...prev, [listing.id]: !prev[listing.id] }));
                        }}
                      >
                        <i className={`fas ${isFlipped ? 'fa-info-circle' : 'fa-project-diagram'}`}></i>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="no-results" id="noResults" style={{ display: sorted.length === 0 ? 'block' : 'none' }}>
                <i className="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or filters.</p>
                <button type="button" id="resetSearch" className="btn btn-secondary" onClick={resetAll}>
                  Reset Filters
                </button>
              </div>

              <div className="pagination" id="pagination" style={{ display: sorted.length === 0 ? 'none' : 'flex' }}>
                <button type="button" className="page-btn active">
                  1
                </button>
                <button type="button" className="page-btn">
                  2
                </button>
                <button type="button" className="page-btn">
                  3
                </button>
                <span className="page-dots">...</span>
                <button type="button" className="page-btn">
                  8
                </button>
                <button type="button" className="page-btn next-btn">
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`quote-cart ${quoteOpen ? 'open' : ''}`} id="quoteCart">
        <div className="quote-cart-header">
          <h3>
            <i className="fas fa-file-invoice"></i> Quote List
          </h3>
          <span className="quote-count" id="quoteCount">
            {quoteItems.length}
          </span>
          <button type="button" className="close-cart" id="closeCart" onClick={() => setQuoteOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="quote-cart-items" id="quoteItems">
          {quoteItems.length === 0 ? (
            <div className="quote-empty" id="quoteEmpty">
              <i className="fas fa-clipboard-list"></i>
              <p>
                No items added yet.
                <br />
                Click &quot;Add to Quote&quot; on any product.
              </p>
            </div>
          ) : (
            quoteItems.map((name) => (
              <div key={name} className="quote-item">
                <div className="quote-item-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="quote-item-info">
                  <div className="quote-item-name">{name}</div>
                  <div className="quote-item-qty">Qty: 1 unit</div>
                </div>
                <button type="button" className="remove-quote-item" title="Remove" onClick={() => removeFromQuote(name)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>
        <div className="quote-cart-footer" id="quoteFooter" style={{ display: quoteItems.length ? 'flex' : 'none' }}>
          <a href="#contact" className="btn btn-primary" id="sendQuoteBtn" onClick={() => setQuoteOpen(false)}>
            <i className="fas fa-paper-plane"></i> Send Quote Request
          </a>
          <button type="button" className="clear-quote-btn" id="clearQuote" onClick={clearQuote}>
            Clear All
          </button>
        </div>
      </div>

      <div
        className={`quote-overlay ${quoteOpen ? 'active' : ''}`}
        id="quoteOverlay"
        onClick={() => setQuoteOpen(false)}
        aria-hidden="true"
      />

      <button type="button" className="quote-fab" id="quoteToggle" title="Quote List" onClick={() => setQuoteOpen(true)}>
        <i className="fas fa-clipboard-list"></i>
        <span
          className="quote-fab-count"
          id="quoteFabCount"
          style={{ display: quoteItems.length ? 'flex' : 'none' }}
        >
          {quoteItems.length}
        </span>
      </button>

      <div className={`quick-view-modal ${quickViewId ? 'open' : ''}`} id="quickViewModal">
        <div className="modal-backdrop" id="modalBackdrop" onClick={() => setQuickViewId(null)} />
        <div className="modal-content">
          <button type="button" className="modal-close" id="modalClose" onClick={() => setQuickViewId(null)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="modal-body" id="modalBody">
            {qv && (
              <div className="modal-product">
                <div className="modal-product-image">
                  <i className={`fas ${qv.icon}`}></i>
                </div>
                <div className="modal-product-info">
                  <div className="modal-brand">{qv.brand}</div>
                  <h2>{qv.name}</h2>
                  <p className="modal-desc">{qv.desc}</p>
                  <div className="modal-specs-grid">
                    {qv.specs.map((s) => (
                      <div key={s.l} className="modal-spec-item">
                        <div className="modal-spec-label">{s.l}</div>
                        <div className="modal-spec-value">{s.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="modal-footer">
                    <div className="product-price">
                      <span className="price-label">Starting from</span>
                      <span className="price-value">{qv.price}</span>
                    </div>
                    <button
                      type="button"
                      className="add-to-quote-btn modal-quote-btn"
                      data-product={qv.name}
                      onClick={() => {
                        addToQuote(qv.name);
                        setTimeout(() => setQuickViewId(null), 800);
                      }}
                    >
                      <i className="fas fa-plus"></i> Add to Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
