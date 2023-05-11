(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const n of document.querySelectorAll('link[rel="modulepreload"]')) r(n);
  new MutationObserver((n) => {
    for (const s of n)
      if (s.type === "childList")
        for (const i of s.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(n) {
    const s = {};
    return (
      n.integrity && (s.integrity = n.integrity),
      n.referrerPolicy && (s.referrerPolicy = n.referrerPolicy),
      n.crossOrigin === "use-credentials"
        ? (s.credentials = "include")
        : n.crossOrigin === "anonymous"
        ? (s.credentials = "omit")
        : (s.credentials = "same-origin"),
      s
    );
  }
  function r(n) {
    if (n.ep) return;
    n.ep = !0;
    const s = t(n);
    fetch(n.href, s);
  }
})();
function Ns(A, e) {
  const t = Object.create(null),
    r = A.split(",");
  for (let n = 0; n < r.length; n++) t[r[n]] = !0;
  return e ? (n) => !!t[n.toLowerCase()] : (n) => !!t[n];
}
function Ze(A) {
  if (P(A)) {
    const e = {};
    for (let t = 0; t < A.length; t++) {
      const r = A[t],
        n = FA(r) ? qB(r) : Ze(r);
      if (n) for (const s in n) e[s] = n[s];
    }
    return e;
  } else {
    if (FA(A)) return A;
    if (cA(A)) return A;
  }
}
const ZB = /;(?![^(]*\))/g,
  jB = /:([^]+)/,
  zB = /\/\*.*?\*\//gs;
function qB(A) {
  const e = {};
  return (
    A.replace(zB, "")
      .split(ZB)
      .forEach((t) => {
        if (t) {
          const r = t.split(jB);
          r.length > 1 && (e[r[0].trim()] = r[1].trim());
        }
      }),
    e
  );
}
function gt(A) {
  let e = "";
  if (FA(A)) e = A;
  else if (P(A))
    for (let t = 0; t < A.length; t++) {
      const r = gt(A[t]);
      r && (e += r + " ");
    }
  else if (cA(A)) for (const t in A) A[t] && (e += t + " ");
  return e.trim();
}
const $B =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Al = Ns($B);
function Yo(A) {
  return !!A || A === "";
}
const ut = (A) =>
    FA(A)
      ? A
      : A == null
      ? ""
      : P(A) || (cA(A) && (A.toString === qo || !X(A.toString)))
      ? JSON.stringify(A, Zo, 2)
      : String(A),
  Zo = (A, e) =>
    e && e.__v_isRef
      ? Zo(A, e.value)
      : Qt(e)
      ? {
          [`Map(${e.size})`]: [...e.entries()].reduce(
            (t, [r, n]) => ((t[`${r} =>`] = n), t),
            {}
          ),
        }
      : jo(e)
      ? { [`Set(${e.size})`]: [...e.values()] }
      : cA(e) && !P(e) && !$o(e)
      ? String(e)
      : e,
  oA = {},
  wt = [],
  re = () => {},
  el = () => !1,
  tl = /^on[^a-z]/,
  rn = (A) => tl.test(A),
  ks = (A) => A.startsWith("onUpdate:"),
  yA = Object.assign,
  Ps = (A, e) => {
    const t = A.indexOf(e);
    t > -1 && A.splice(t, 1);
  },
  rl = Object.prototype.hasOwnProperty,
  z = (A, e) => rl.call(A, e),
  P = Array.isArray,
  Qt = (A) => nn(A) === "[object Map]",
  jo = (A) => nn(A) === "[object Set]",
  X = (A) => typeof A == "function",
  FA = (A) => typeof A == "string",
  Xs = (A) => typeof A == "symbol",
  cA = (A) => A !== null && typeof A == "object",
  zo = (A) => cA(A) && X(A.then) && X(A.catch),
  qo = Object.prototype.toString,
  nn = (A) => qo.call(A),
  nl = (A) => nn(A).slice(8, -1),
  $o = (A) => nn(A) === "[object Object]",
  Js = (A) =>
    FA(A) && A !== "NaN" && A[0] !== "-" && "" + parseInt(A, 10) === A,
  Dr = Ns(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  sn = (A) => {
    const e = Object.create(null);
    return (t) => e[t] || (e[t] = A(t));
  },
  sl = /-(\w)/g,
  fe = sn((A) => A.replace(sl, (e, t) => (t ? t.toUpperCase() : ""))),
  il = /\B([A-Z])/g,
  pt = sn((A) => A.replace(il, "-$1").toLowerCase()),
  on = sn((A) => A.charAt(0).toUpperCase() + A.slice(1)),
  yn = sn((A) => (A ? `on${on(A)}` : "")),
  kr = (A, e) => !Object.is(A, e),
  Sr = (A, e) => {
    for (let t = 0; t < A.length; t++) A[t](e);
  },
  Pr = (A, e, t) => {
    Object.defineProperty(A, e, { configurable: !0, enumerable: !1, value: t });
  },
  rs = (A) => {
    const e = parseFloat(A);
    return isNaN(e) ? A : e;
  };
let di;
const ol = () =>
  di ||
  (di =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let $A;
class al {
  constructor(e = !1) {
    (this.detached = e),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = $A),
      !e && $A && (this.index = ($A.scopes || ($A.scopes = [])).push(this) - 1);
  }
  get active() {
    return this._active;
  }
  run(e) {
    if (this._active) {
      const t = $A;
      try {
        return ($A = this), e();
      } finally {
        $A = t;
      }
    }
  }
  on() {
    $A = this;
  }
  off() {
    $A = this.parent;
  }
  stop(e) {
    if (this._active) {
      let t, r;
      for (t = 0, r = this.effects.length; t < r; t++) this.effects[t].stop();
      for (t = 0, r = this.cleanups.length; t < r; t++) this.cleanups[t]();
      if (this.scopes)
        for (t = 0, r = this.scopes.length; t < r; t++) this.scopes[t].stop(!0);
      if (!this.detached && this.parent && !e) {
        const n = this.parent.scopes.pop();
        n &&
          n !== this &&
          ((this.parent.scopes[this.index] = n), (n.index = this.index));
      }
      (this.parent = void 0), (this._active = !1);
    }
  }
}
function Bl(A, e = $A) {
  e && e.active && e.effects.push(A);
}
function ll() {
  return $A;
}
const Ws = (A) => {
    const e = new Set(A);
    return (e.w = 0), (e.n = 0), e;
  },
  Aa = (A) => (A.w & Oe) > 0,
  ea = (A) => (A.n & Oe) > 0,
  cl = ({ deps: A }) => {
    if (A.length) for (let e = 0; e < A.length; e++) A[e].w |= Oe;
  },
  ul = (A) => {
    const { deps: e } = A;
    if (e.length) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        const n = e[r];
        Aa(n) && !ea(n) ? n.delete(A) : (e[t++] = n),
          (n.w &= ~Oe),
          (n.n &= ~Oe);
      }
      e.length = t;
    }
  },
  ns = new WeakMap();
let Tt = 0,
  Oe = 1;
const ss = 30;
let ee;
const je = Symbol(""),
  is = Symbol("");
class Ys {
  constructor(e, t = null, r) {
    (this.fn = e),
      (this.scheduler = t),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Bl(this, r);
  }
  run() {
    if (!this.active) return this.fn();
    let e = ee,
      t = Le;
    for (; e; ) {
      if (e === this) return;
      e = e.parent;
    }
    try {
      return (
        (this.parent = ee),
        (ee = this),
        (Le = !0),
        (Oe = 1 << ++Tt),
        Tt <= ss ? cl(this) : Ci(this),
        this.fn()
      );
    } finally {
      Tt <= ss && ul(this),
        (Oe = 1 << --Tt),
        (ee = this.parent),
        (Le = t),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    ee === this
      ? (this.deferStop = !0)
      : this.active &&
        (Ci(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function Ci(A) {
  const { deps: e } = A;
  if (e.length) {
    for (let t = 0; t < e.length; t++) e[t].delete(A);
    e.length = 0;
  }
}
let Le = !0;
const ta = [];
function Et() {
  ta.push(Le), (Le = !1);
}
function Ht() {
  const A = ta.pop();
  Le = A === void 0 ? !0 : A;
}
function SA(A, e, t) {
  if (Le && ee) {
    let r = ns.get(A);
    r || ns.set(A, (r = new Map()));
    let n = r.get(t);
    n || r.set(t, (n = Ws())), ra(n);
  }
}
function ra(A, e) {
  let t = !1;
  Tt <= ss ? ea(A) || ((A.n |= Oe), (t = !Aa(A))) : (t = !A.has(ee)),
    t && (A.add(ee), ee.deps.push(A));
}
function Fe(A, e, t, r, n, s) {
  const i = ns.get(A);
  if (!i) return;
  let o = [];
  if (e === "clear") o = [...i.values()];
  else if (t === "length" && P(A)) {
    const a = Number(r);
    i.forEach((B, l) => {
      (l === "length" || l >= a) && o.push(B);
    });
  } else
    switch ((t !== void 0 && o.push(i.get(t)), e)) {
      case "add":
        P(A)
          ? Js(t) && o.push(i.get("length"))
          : (o.push(i.get(je)), Qt(A) && o.push(i.get(is)));
        break;
      case "delete":
        P(A) || (o.push(i.get(je)), Qt(A) && o.push(i.get(is)));
        break;
      case "set":
        Qt(A) && o.push(i.get(je));
        break;
    }
  if (o.length === 1) o[0] && os(o[0]);
  else {
    const a = [];
    for (const B of o) B && a.push(...B);
    os(Ws(a));
  }
}
function os(A, e) {
  const t = P(A) ? A : [...A];
  for (const r of t) r.computed && Ui(r);
  for (const r of t) r.computed || Ui(r);
}
function Ui(A, e) {
  (A !== ee || A.allowRecurse) && (A.scheduler ? A.scheduler() : A.run());
}
const fl = Ns("__proto__,__v_isRef,__isVue"),
  na = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((A) => A !== "arguments" && A !== "caller")
      .map((A) => Symbol[A])
      .filter(Xs)
  ),
  gl = Zs(),
  wl = Zs(!1, !0),
  Ql = Zs(!0),
  Fi = hl();
function hl() {
  const A = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
      A[e] = function (...t) {
        const r = eA(this);
        for (let s = 0, i = this.length; s < i; s++) SA(r, "get", s + "");
        const n = r[e](...t);
        return n === -1 || n === !1 ? r[e](...t.map(eA)) : n;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
      A[e] = function (...t) {
        Et();
        const r = eA(this)[e].apply(this, t);
        return Ht(), r;
      };
    }),
    A
  );
}
function dl(A) {
  const e = eA(this);
  return SA(e, "has", A), e.hasOwnProperty(A);
}
function Zs(A = !1, e = !1) {
  return function (r, n, s) {
    if (n === "__v_isReactive") return !A;
    if (n === "__v_isReadonly") return A;
    if (n === "__v_isShallow") return e;
    if (n === "__v_raw" && s === (A ? (e ? Dl : Ba) : e ? aa : oa).get(r))
      return r;
    const i = P(r);
    if (!A) {
      if (i && z(Fi, n)) return Reflect.get(Fi, n, s);
      if (n === "hasOwnProperty") return dl;
    }
    const o = Reflect.get(r, n, s);
    return (Xs(n) ? na.has(n) : fl(n)) || (A || SA(r, "get", n), e)
      ? o
      : LA(o)
      ? i && Js(n)
        ? o
        : o.value
      : cA(o)
      ? A
        ? la(o)
        : qs(o)
      : o;
  };
}
const Cl = sa(),
  Ul = sa(!0);
function sa(A = !1) {
  return function (t, r, n, s) {
    let i = t[r];
    if (Yt(i) && LA(i) && !LA(n)) return !1;
    if (
      !A &&
      (!as(n) && !Yt(n) && ((i = eA(i)), (n = eA(n))), !P(t) && LA(i) && !LA(n))
    )
      return (i.value = n), !0;
    const o = P(t) && Js(r) ? Number(r) < t.length : z(t, r),
      a = Reflect.set(t, r, n, s);
    return (
      t === eA(s) && (o ? kr(n, i) && Fe(t, "set", r, n) : Fe(t, "add", r, n)),
      a
    );
  };
}
function Fl(A, e) {
  const t = z(A, e);
  A[e];
  const r = Reflect.deleteProperty(A, e);
  return r && t && Fe(A, "delete", e, void 0), r;
}
function pl(A, e) {
  const t = Reflect.has(A, e);
  return (!Xs(e) || !na.has(e)) && SA(A, "has", e), t;
}
function El(A) {
  return SA(A, "iterate", P(A) ? "length" : je), Reflect.ownKeys(A);
}
const ia = { get: gl, set: Cl, deleteProperty: Fl, has: pl, ownKeys: El },
  Hl = {
    get: Ql,
    set(A, e) {
      return !0;
    },
    deleteProperty(A, e) {
      return !0;
    },
  },
  vl = yA({}, ia, { get: wl, set: Ul }),
  js = (A) => A,
  an = (A) => Reflect.getPrototypeOf(A);
function sr(A, e, t = !1, r = !1) {
  A = A.__v_raw;
  const n = eA(A),
    s = eA(e);
  t || (e !== s && SA(n, "get", e), SA(n, "get", s));
  const { has: i } = an(n),
    o = r ? js : t ? ei : Ai;
  if (i.call(n, e)) return o(A.get(e));
  if (i.call(n, s)) return o(A.get(s));
  A !== n && A.get(e);
}
function ir(A, e = !1) {
  const t = this.__v_raw,
    r = eA(t),
    n = eA(A);
  return (
    e || (A !== n && SA(r, "has", A), SA(r, "has", n)),
    A === n ? t.has(A) : t.has(A) || t.has(n)
  );
}
function or(A, e = !1) {
  return (
    (A = A.__v_raw), !e && SA(eA(A), "iterate", je), Reflect.get(A, "size", A)
  );
}
function pi(A) {
  A = eA(A);
  const e = eA(this);
  return an(e).has.call(e, A) || (e.add(A), Fe(e, "add", A, A)), this;
}
function Ei(A, e) {
  e = eA(e);
  const t = eA(this),
    { has: r, get: n } = an(t);
  let s = r.call(t, A);
  s || ((A = eA(A)), (s = r.call(t, A)));
  const i = n.call(t, A);
  return (
    t.set(A, e), s ? kr(e, i) && Fe(t, "set", A, e) : Fe(t, "add", A, e), this
  );
}
function Hi(A) {
  const e = eA(this),
    { has: t, get: r } = an(e);
  let n = t.call(e, A);
  n || ((A = eA(A)), (n = t.call(e, A))), r && r.call(e, A);
  const s = e.delete(A);
  return n && Fe(e, "delete", A, void 0), s;
}
function vi() {
  const A = eA(this),
    e = A.size !== 0,
    t = A.clear();
  return e && Fe(A, "clear", void 0, void 0), t;
}
function ar(A, e) {
  return function (r, n) {
    const s = this,
      i = s.__v_raw,
      o = eA(i),
      a = e ? js : A ? ei : Ai;
    return (
      !A && SA(o, "iterate", je), i.forEach((B, l) => r.call(n, a(B), a(l), s))
    );
  };
}
function Br(A, e, t) {
  return function (...r) {
    const n = this.__v_raw,
      s = eA(n),
      i = Qt(s),
      o = A === "entries" || (A === Symbol.iterator && i),
      a = A === "keys" && i,
      B = n[A](...r),
      l = t ? js : e ? ei : Ai;
    return (
      !e && SA(s, "iterate", a ? is : je),
      {
        next() {
          const { value: c, done: f } = B.next();
          return f
            ? { value: c, done: f }
            : { value: o ? [l(c[0]), l(c[1])] : l(c), done: f };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function He(A) {
  return function (...e) {
    return A === "delete" ? !1 : this;
  };
}
function ml() {
  const A = {
      get(s) {
        return sr(this, s);
      },
      get size() {
        return or(this);
      },
      has: ir,
      add: pi,
      set: Ei,
      delete: Hi,
      clear: vi,
      forEach: ar(!1, !1),
    },
    e = {
      get(s) {
        return sr(this, s, !1, !0);
      },
      get size() {
        return or(this);
      },
      has: ir,
      add: pi,
      set: Ei,
      delete: Hi,
      clear: vi,
      forEach: ar(!1, !0),
    },
    t = {
      get(s) {
        return sr(this, s, !0);
      },
      get size() {
        return or(this, !0);
      },
      has(s) {
        return ir.call(this, s, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: ar(!0, !1),
    },
    r = {
      get(s) {
        return sr(this, s, !0, !0);
      },
      get size() {
        return or(this, !0);
      },
      has(s) {
        return ir.call(this, s, !0);
      },
      add: He("add"),
      set: He("set"),
      delete: He("delete"),
      clear: He("clear"),
      forEach: ar(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
      (A[s] = Br(s, !1, !1)),
        (t[s] = Br(s, !0, !1)),
        (e[s] = Br(s, !1, !0)),
        (r[s] = Br(s, !0, !0));
    }),
    [A, t, e, r]
  );
}
const [Il, yl, bl, Kl] = ml();
function zs(A, e) {
  const t = e ? (A ? Kl : bl) : A ? yl : Il;
  return (r, n, s) =>
    n === "__v_isReactive"
      ? !A
      : n === "__v_isReadonly"
      ? A
      : n === "__v_raw"
      ? r
      : Reflect.get(z(t, n) && n in r ? t : r, n, s);
}
const xl = { get: zs(!1, !1) },
  Ll = { get: zs(!1, !0) },
  Tl = { get: zs(!0, !1) },
  oa = new WeakMap(),
  aa = new WeakMap(),
  Ba = new WeakMap(),
  Dl = new WeakMap();
function Sl(A) {
  switch (A) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ol(A) {
  return A.__v_skip || !Object.isExtensible(A) ? 0 : Sl(nl(A));
}
function qs(A) {
  return Yt(A) ? A : $s(A, !1, ia, xl, oa);
}
function _l(A) {
  return $s(A, !1, vl, Ll, aa);
}
function la(A) {
  return $s(A, !0, Hl, Tl, Ba);
}
function $s(A, e, t, r, n) {
  if (!cA(A) || (A.__v_raw && !(e && A.__v_isReactive))) return A;
  const s = n.get(A);
  if (s) return s;
  const i = Ol(A);
  if (i === 0) return A;
  const o = new Proxy(A, i === 2 ? r : t);
  return n.set(A, o), o;
}
function ht(A) {
  return Yt(A) ? ht(A.__v_raw) : !!(A && A.__v_isReactive);
}
function Yt(A) {
  return !!(A && A.__v_isReadonly);
}
function as(A) {
  return !!(A && A.__v_isShallow);
}
function ca(A) {
  return ht(A) || Yt(A);
}
function eA(A) {
  const e = A && A.__v_raw;
  return e ? eA(e) : A;
}
function ua(A) {
  return Pr(A, "__v_skip", !0), A;
}
const Ai = (A) => (cA(A) ? qs(A) : A),
  ei = (A) => (cA(A) ? la(A) : A);
function Ml(A) {
  Le && ee && ((A = eA(A)), ra(A.dep || (A.dep = Ws())));
}
function Rl(A, e) {
  A = eA(A);
  const t = A.dep;
  t && os(t);
}
function LA(A) {
  return !!(A && A.__v_isRef === !0);
}
function Gl(A) {
  return LA(A) ? A.value : A;
}
const Vl = {
  get: (A, e, t) => Gl(Reflect.get(A, e, t)),
  set: (A, e, t, r) => {
    const n = A[e];
    return LA(n) && !LA(t) ? ((n.value = t), !0) : Reflect.set(A, e, t, r);
  },
};
function fa(A) {
  return ht(A) ? A : new Proxy(A, Vl);
}
var ga;
class Nl {
  constructor(e, t, r, n) {
    (this._setter = t),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[ga] = !1),
      (this._dirty = !0),
      (this.effect = new Ys(e, () => {
        this._dirty || ((this._dirty = !0), Rl(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !n),
      (this.__v_isReadonly = r);
  }
  get value() {
    const e = eA(this);
    return (
      Ml(e),
      (e._dirty || !e._cacheable) &&
        ((e._dirty = !1), (e._value = e.effect.run())),
      e._value
    );
  }
  set value(e) {
    this._setter(e);
  }
}
ga = "__v_isReadonly";
function kl(A, e, t = !1) {
  let r, n;
  const s = X(A);
  return (
    s ? ((r = A), (n = re)) : ((r = A.get), (n = A.set)),
    new Nl(r, n, s || !n, t)
  );
}
function Te(A, e, t, r) {
  let n;
  try {
    n = r ? A(...r) : A();
  } catch (s) {
    Bn(s, e, t);
  }
  return n;
}
function YA(A, e, t, r) {
  if (X(A)) {
    const s = Te(A, e, t, r);
    return (
      s &&
        zo(s) &&
        s.catch((i) => {
          Bn(i, e, t);
        }),
      s
    );
  }
  const n = [];
  for (let s = 0; s < A.length; s++) n.push(YA(A[s], e, t, r));
  return n;
}
function Bn(A, e, t, r = !0) {
  const n = e ? e.vnode : null;
  if (e) {
    let s = e.parent;
    const i = e.proxy,
      o = t;
    for (; s; ) {
      const B = s.ec;
      if (B) {
        for (let l = 0; l < B.length; l++) if (B[l](A, i, o) === !1) return;
      }
      s = s.parent;
    }
    const a = e.appContext.config.errorHandler;
    if (a) {
      Te(a, null, 10, [A, i, o]);
      return;
    }
  }
  Pl(A, t, n, r);
}
function Pl(A, e, t, r = !0) {
  console.error(A);
}
let Zt = !1,
  Bs = !1;
const IA = [];
let ue = 0;
const dt = [];
let Ce = null,
  ke = 0;
const wa = Promise.resolve();
let ti = null;
function Xl(A) {
  const e = ti || wa;
  return A ? e.then(this ? A.bind(this) : A) : e;
}
function Jl(A) {
  let e = ue + 1,
    t = IA.length;
  for (; e < t; ) {
    const r = (e + t) >>> 1;
    jt(IA[r]) < A ? (e = r + 1) : (t = r);
  }
  return e;
}
function ri(A) {
  (!IA.length || !IA.includes(A, Zt && A.allowRecurse ? ue + 1 : ue)) &&
    (A.id == null ? IA.push(A) : IA.splice(Jl(A.id), 0, A), Qa());
}
function Qa() {
  !Zt && !Bs && ((Bs = !0), (ti = wa.then(da)));
}
function Wl(A) {
  const e = IA.indexOf(A);
  e > ue && IA.splice(e, 1);
}
function Yl(A) {
  P(A)
    ? dt.push(...A)
    : (!Ce || !Ce.includes(A, A.allowRecurse ? ke + 1 : ke)) && dt.push(A),
    Qa();
}
function mi(A, e = Zt ? ue + 1 : 0) {
  for (; e < IA.length; e++) {
    const t = IA[e];
    t && t.pre && (IA.splice(e, 1), e--, t());
  }
}
function ha(A) {
  if (dt.length) {
    const e = [...new Set(dt)];
    if (((dt.length = 0), Ce)) {
      Ce.push(...e);
      return;
    }
    for (Ce = e, Ce.sort((t, r) => jt(t) - jt(r)), ke = 0; ke < Ce.length; ke++)
      Ce[ke]();
    (Ce = null), (ke = 0);
  }
}
const jt = (A) => (A.id == null ? 1 / 0 : A.id),
  Zl = (A, e) => {
    const t = jt(A) - jt(e);
    if (t === 0) {
      if (A.pre && !e.pre) return -1;
      if (e.pre && !A.pre) return 1;
    }
    return t;
  };
function da(A) {
  (Bs = !1), (Zt = !0), IA.sort(Zl);
  const e = re;
  try {
    for (ue = 0; ue < IA.length; ue++) {
      const t = IA[ue];
      t && t.active !== !1 && Te(t, null, 14);
    }
  } finally {
    (ue = 0),
      (IA.length = 0),
      ha(),
      (Zt = !1),
      (ti = null),
      (IA.length || dt.length) && da();
  }
}
function jl(A, e, ...t) {
  if (A.isUnmounted) return;
  const r = A.vnode.props || oA;
  let n = t;
  const s = e.startsWith("update:"),
    i = s && e.slice(7);
  if (i && i in r) {
    const l = `${i === "modelValue" ? "model" : i}Modifiers`,
      { number: c, trim: f } = r[l] || oA;
    f && (n = t.map((C) => (FA(C) ? C.trim() : C))), c && (n = t.map(rs));
  }
  let o,
    a = r[(o = yn(e))] || r[(o = yn(fe(e)))];
  !a && s && (a = r[(o = yn(pt(e)))]), a && YA(a, A, 6, n);
  const B = r[o + "Once"];
  if (B) {
    if (!A.emitted) A.emitted = {};
    else if (A.emitted[o]) return;
    (A.emitted[o] = !0), YA(B, A, 6, n);
  }
}
function Ca(A, e, t = !1) {
  const r = e.emitsCache,
    n = r.get(A);
  if (n !== void 0) return n;
  const s = A.emits;
  let i = {},
    o = !1;
  if (!X(A)) {
    const a = (B) => {
      const l = Ca(B, e, !0);
      l && ((o = !0), yA(i, l));
    };
    !t && e.mixins.length && e.mixins.forEach(a),
      A.extends && a(A.extends),
      A.mixins && A.mixins.forEach(a);
  }
  return !s && !o
    ? (cA(A) && r.set(A, null), null)
    : (P(s) ? s.forEach((a) => (i[a] = null)) : yA(i, s),
      cA(A) && r.set(A, i),
      i);
}
function ln(A, e) {
  return !A || !rn(e)
    ? !1
    : ((e = e.slice(2).replace(/Once$/, "")),
      z(A, e[0].toLowerCase() + e.slice(1)) || z(A, pt(e)) || z(A, e));
}
let RA = null,
  Ua = null;
function Xr(A) {
  const e = RA;
  return (RA = A), (Ua = (A && A.type.__scopeId) || null), e;
}
function zl(A, e = RA, t) {
  if (!e || A._n) return A;
  const r = (...n) => {
    r._d && Oi(-1);
    const s = Xr(e);
    let i;
    try {
      i = A(...n);
    } finally {
      Xr(s), r._d && Oi(1);
    }
    return i;
  };
  return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function bn(A) {
  const {
    type: e,
    vnode: t,
    proxy: r,
    withProxy: n,
    props: s,
    propsOptions: [i],
    slots: o,
    attrs: a,
    emit: B,
    render: l,
    renderCache: c,
    data: f,
    setupState: C,
    ctx: d,
    inheritAttrs: Q,
  } = A;
  let _, E;
  const I = Xr(A);
  try {
    if (t.shapeFlag & 4) {
      const O = n || r;
      (_ = ce(l.call(O, O, c, s, C, f, d))), (E = a);
    } else {
      const O = e;
      (_ = ce(
        O.length > 1 ? O(s, { attrs: a, slots: o, emit: B }) : O(s, null)
      )),
        (E = e.props ? a : ql(a));
    }
  } catch (O) {
    (Nt.length = 0), Bn(O, A, 1), (_ = GA(ne));
  }
  let b = _;
  if (E && Q !== !1) {
    const O = Object.keys(E),
      { shapeFlag: S } = b;
    O.length && S & 7 && (i && O.some(ks) && (E = $l(E, i)), (b = _e(b, E)));
  }
  return (
    t.dirs && ((b = _e(b)), (b.dirs = b.dirs ? b.dirs.concat(t.dirs) : t.dirs)),
    t.transition && (b.transition = t.transition),
    (_ = b),
    Xr(I),
    _
  );
}
const ql = (A) => {
    let e;
    for (const t in A)
      (t === "class" || t === "style" || rn(t)) && ((e || (e = {}))[t] = A[t]);
    return e;
  },
  $l = (A, e) => {
    const t = {};
    for (const r in A) (!ks(r) || !(r.slice(9) in e)) && (t[r] = A[r]);
    return t;
  };
function Ac(A, e, t) {
  const { props: r, children: n, component: s } = A,
    { props: i, children: o, patchFlag: a } = e,
    B = s.emitsOptions;
  if (e.dirs || e.transition) return !0;
  if (t && a >= 0) {
    if (a & 1024) return !0;
    if (a & 16) return r ? Ii(r, i, B) : !!i;
    if (a & 8) {
      const l = e.dynamicProps;
      for (let c = 0; c < l.length; c++) {
        const f = l[c];
        if (i[f] !== r[f] && !ln(B, f)) return !0;
      }
    }
  } else
    return (n || o) && (!o || !o.$stable)
      ? !0
      : r === i
      ? !1
      : r
      ? i
        ? Ii(r, i, B)
        : !0
      : !!i;
  return !1;
}
function Ii(A, e, t) {
  const r = Object.keys(e);
  if (r.length !== Object.keys(A).length) return !0;
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (e[s] !== A[s] && !ln(t, s)) return !0;
  }
  return !1;
}
function ec({ vnode: A, parent: e }, t) {
  for (; e && e.subTree === A; ) ((A = e.vnode).el = t), (e = e.parent);
}
const tc = (A) => A.__isSuspense;
function rc(A, e) {
  e && e.pendingBranch
    ? P(A)
      ? e.effects.push(...A)
      : e.effects.push(A)
    : Yl(A);
}
function nc(A, e) {
  if (gA) {
    let t = gA.provides;
    const r = gA.parent && gA.parent.provides;
    r === t && (t = gA.provides = Object.create(r)), (t[A] = e);
  }
}
function Or(A, e, t = !1) {
  const r = gA || RA;
  if (r) {
    const n =
      r.parent == null
        ? r.vnode.appContext && r.vnode.appContext.provides
        : r.parent.provides;
    if (n && A in n) return n[A];
    if (arguments.length > 1) return t && X(e) ? e.call(r.proxy) : e;
  }
}
const lr = {};
function Kn(A, e, t) {
  return Fa(A, e, t);
}
function Fa(
  A,
  e,
  { immediate: t, deep: r, flush: n, onTrack: s, onTrigger: i } = oA
) {
  const o = ll() === (gA == null ? void 0 : gA.scope) ? gA : null;
  let a,
    B = !1,
    l = !1;
  if (
    (LA(A)
      ? ((a = () => A.value), (B = as(A)))
      : ht(A)
      ? ((a = () => A), (r = !0))
      : P(A)
      ? ((l = !0),
        (B = A.some((b) => ht(b) || as(b))),
        (a = () =>
          A.map((b) => {
            if (LA(b)) return b.value;
            if (ht(b)) return We(b);
            if (X(b)) return Te(b, o, 2);
          })))
      : X(A)
      ? e
        ? (a = () => Te(A, o, 2))
        : (a = () => {
            if (!(o && o.isUnmounted)) return c && c(), YA(A, o, 3, [f]);
          })
      : (a = re),
    e && r)
  ) {
    const b = a;
    a = () => We(b());
  }
  let c,
    f = (b) => {
      c = E.onStop = () => {
        Te(b, o, 4);
      };
    },
    C;
  if ($t)
    if (
      ((f = re),
      e ? t && YA(e, o, 3, [a(), l ? [] : void 0, f]) : a(),
      n === "sync")
    ) {
      const b = tu();
      C = b.__watcherHandles || (b.__watcherHandles = []);
    } else return re;
  let d = l ? new Array(A.length).fill(lr) : lr;
  const Q = () => {
    if (E.active)
      if (e) {
        const b = E.run();
        (r || B || (l ? b.some((O, S) => kr(O, d[S])) : kr(b, d))) &&
          (c && c(),
          YA(e, o, 3, [b, d === lr ? void 0 : l && d[0] === lr ? [] : d, f]),
          (d = b));
      } else E.run();
  };
  Q.allowRecurse = !!e;
  let _;
  n === "sync"
    ? (_ = Q)
    : n === "post"
    ? (_ = () => TA(Q, o && o.suspense))
    : ((Q.pre = !0), o && (Q.id = o.uid), (_ = () => ri(Q)));
  const E = new Ys(a, _);
  e
    ? t
      ? Q()
      : (d = E.run())
    : n === "post"
    ? TA(E.run.bind(E), o && o.suspense)
    : E.run();
  const I = () => {
    E.stop(), o && o.scope && Ps(o.scope.effects, E);
  };
  return C && C.push(I), I;
}
function sc(A, e, t) {
  const r = this.proxy,
    n = FA(A) ? (A.includes(".") ? pa(r, A) : () => r[A]) : A.bind(r, r);
  let s;
  X(e) ? (s = e) : ((s = e.handler), (t = e));
  const i = gA;
  Ut(this);
  const o = Fa(n, s.bind(r), t);
  return i ? Ut(i) : ze(), o;
}
function pa(A, e) {
  const t = e.split(".");
  return () => {
    let r = A;
    for (let n = 0; n < t.length && r; n++) r = r[t[n]];
    return r;
  };
}
function We(A, e) {
  if (!cA(A) || A.__v_skip || ((e = e || new Set()), e.has(A))) return A;
  if ((e.add(A), LA(A))) We(A.value, e);
  else if (P(A)) for (let t = 0; t < A.length; t++) We(A[t], e);
  else if (jo(A) || Qt(A))
    A.forEach((t) => {
      We(t, e);
    });
  else if ($o(A)) for (const t in A) We(A[t], e);
  return A;
}
function ic() {
  const A = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    Ia(() => {
      A.isMounted = !0;
    }),
    ya(() => {
      A.isUnmounting = !0;
    }),
    A
  );
}
const NA = [Function, Array],
  oc = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: NA,
      onEnter: NA,
      onAfterEnter: NA,
      onEnterCancelled: NA,
      onBeforeLeave: NA,
      onLeave: NA,
      onAfterLeave: NA,
      onLeaveCancelled: NA,
      onBeforeAppear: NA,
      onAppear: NA,
      onAfterAppear: NA,
      onAppearCancelled: NA,
    },
    setup(A, { slots: e }) {
      const t = Wc(),
        r = ic();
      let n;
      return () => {
        const s = e.default && Ha(e.default(), !0);
        if (!s || !s.length) return;
        let i = s[0];
        if (s.length > 1) {
          for (const Q of s)
            if (Q.type !== ne) {
              i = Q;
              break;
            }
        }
        const o = eA(A),
          { mode: a } = o;
        if (r.isLeaving) return xn(i);
        const B = yi(i);
        if (!B) return xn(i);
        const l = ls(B, o, r, t);
        cs(B, l);
        const c = t.subTree,
          f = c && yi(c);
        let C = !1;
        const { getTransitionKey: d } = B.type;
        if (d) {
          const Q = d();
          n === void 0 ? (n = Q) : Q !== n && ((n = Q), (C = !0));
        }
        if (f && f.type !== ne && (!Pe(B, f) || C)) {
          const Q = ls(f, o, r, t);
          if ((cs(f, Q), a === "out-in"))
            return (
              (r.isLeaving = !0),
              (Q.afterLeave = () => {
                (r.isLeaving = !1), t.update.active !== !1 && t.update();
              }),
              xn(i)
            );
          a === "in-out" &&
            B.type !== ne &&
            (Q.delayLeave = (_, E, I) => {
              const b = Ea(r, f);
              (b[String(f.key)] = f),
                (_._leaveCb = () => {
                  E(), (_._leaveCb = void 0), delete l.delayedLeave;
                }),
                (l.delayedLeave = I);
            });
        }
        return i;
      };
    },
  },
  ac = oc;
function Ea(A, e) {
  const { leavingVNodes: t } = A;
  let r = t.get(e.type);
  return r || ((r = Object.create(null)), t.set(e.type, r)), r;
}
function ls(A, e, t, r) {
  const {
      appear: n,
      mode: s,
      persisted: i = !1,
      onBeforeEnter: o,
      onEnter: a,
      onAfterEnter: B,
      onEnterCancelled: l,
      onBeforeLeave: c,
      onLeave: f,
      onAfterLeave: C,
      onLeaveCancelled: d,
      onBeforeAppear: Q,
      onAppear: _,
      onAfterAppear: E,
      onAppearCancelled: I,
    } = e,
    b = String(A.key),
    O = Ea(t, A),
    S = (x, D) => {
      x && YA(x, r, 9, D);
    },
    m = (x, D) => {
      const k = D[1];
      S(x, D),
        P(x) ? x.every((tA) => tA.length <= 1) && k() : x.length <= 1 && k();
    },
    N = {
      mode: s,
      persisted: i,
      beforeEnter(x) {
        let D = o;
        if (!t.isMounted)
          if (n) D = Q || o;
          else return;
        x._leaveCb && x._leaveCb(!0);
        const k = O[b];
        k && Pe(A, k) && k.el._leaveCb && k.el._leaveCb(), S(D, [x]);
      },
      enter(x) {
        let D = a,
          k = B,
          tA = l;
        if (!t.isMounted)
          if (n) (D = _ || a), (k = E || B), (tA = I || l);
          else return;
        let aA = !1;
        const J = (x._enterCb = (lA) => {
          aA ||
            ((aA = !0),
            lA ? S(tA, [x]) : S(k, [x]),
            N.delayedLeave && N.delayedLeave(),
            (x._enterCb = void 0));
        });
        D ? m(D, [x, J]) : J();
      },
      leave(x, D) {
        const k = String(A.key);
        if ((x._enterCb && x._enterCb(!0), t.isUnmounting)) return D();
        S(c, [x]);
        let tA = !1;
        const aA = (x._leaveCb = (J) => {
          tA ||
            ((tA = !0),
            D(),
            J ? S(d, [x]) : S(C, [x]),
            (x._leaveCb = void 0),
            O[k] === A && delete O[k]);
        });
        (O[k] = A), f ? m(f, [x, aA]) : aA();
      },
      clone(x) {
        return ls(x, e, t, r);
      },
    };
  return N;
}
function xn(A) {
  if (cn(A)) return (A = _e(A)), (A.children = null), A;
}
function yi(A) {
  return cn(A) ? (A.children ? A.children[0] : void 0) : A;
}
function cs(A, e) {
  A.shapeFlag & 6 && A.component
    ? cs(A.component.subTree, e)
    : A.shapeFlag & 128
    ? ((A.ssContent.transition = e.clone(A.ssContent)),
      (A.ssFallback.transition = e.clone(A.ssFallback)))
    : (A.transition = e);
}
function Ha(A, e = !1, t) {
  let r = [],
    n = 0;
  for (let s = 0; s < A.length; s++) {
    let i = A[s];
    const o = t == null ? i.key : String(t) + String(i.key != null ? i.key : s);
    i.type === PA
      ? (i.patchFlag & 128 && n++, (r = r.concat(Ha(i.children, e, o))))
      : (e || i.type !== ne) && r.push(o != null ? _e(i, { key: o }) : i);
  }
  if (n > 1) for (let s = 0; s < r.length; s++) r[s].patchFlag = -2;
  return r;
}
function va(A) {
  return X(A) ? { setup: A, name: A.name } : A;
}
const _r = (A) => !!A.type.__asyncLoader,
  cn = (A) => A.type.__isKeepAlive;
function Bc(A, e) {
  ma(A, "a", e);
}
function lc(A, e) {
  ma(A, "da", e);
}
function ma(A, e, t = gA) {
  const r =
    A.__wdc ||
    (A.__wdc = () => {
      let n = t;
      for (; n; ) {
        if (n.isDeactivated) return;
        n = n.parent;
      }
      return A();
    });
  if ((un(e, r, t), t)) {
    let n = t.parent;
    for (; n && n.parent; )
      cn(n.parent.vnode) && cc(r, e, t, n), (n = n.parent);
  }
}
function cc(A, e, t, r) {
  const n = un(e, A, r, !0);
  ba(() => {
    Ps(r[e], n);
  }, t);
}
function un(A, e, t = gA, r = !1) {
  if (t) {
    const n = t[A] || (t[A] = []),
      s =
        e.__weh ||
        (e.__weh = (...i) => {
          if (t.isUnmounted) return;
          Et(), Ut(t);
          const o = YA(e, t, A, i);
          return ze(), Ht(), o;
        });
    return r ? n.unshift(s) : n.push(s), s;
  }
}
const Ee =
    (A) =>
    (e, t = gA) =>
      (!$t || A === "sp") && un(A, (...r) => e(...r), t),
  uc = Ee("bm"),
  Ia = Ee("m"),
  fc = Ee("bu"),
  gc = Ee("u"),
  ya = Ee("bum"),
  ba = Ee("um"),
  wc = Ee("sp"),
  Qc = Ee("rtg"),
  hc = Ee("rtc");
function dc(A, e = gA) {
  un("ec", A, e);
}
function It(A, e) {
  const t = RA;
  if (t === null) return A;
  const r = wn(t) || t.proxy,
    n = A.dirs || (A.dirs = []);
  for (let s = 0; s < e.length; s++) {
    let [i, o, a, B = oA] = e[s];
    i &&
      (X(i) && (i = { mounted: i, updated: i }),
      i.deep && We(o),
      n.push({
        dir: i,
        instance: r,
        value: o,
        oldValue: void 0,
        arg: a,
        modifiers: B,
      }));
  }
  return A;
}
function Re(A, e, t, r) {
  const n = A.dirs,
    s = e && e.dirs;
  for (let i = 0; i < n.length; i++) {
    const o = n[i];
    s && (o.oldValue = s[i].value);
    let a = o.dir[r];
    a && (Et(), YA(a, t, 8, [A.el, o, A, e]), Ht());
  }
}
const Ka = "components";
function us(A, e) {
  return Uc(Ka, A, !0, e) || A;
}
const Cc = Symbol();
function Uc(A, e, t = !0, r = !1) {
  const n = RA || gA;
  if (n) {
    const s = n.type;
    if (A === Ka) {
      const o = qc(s, !1);
      if (o && (o === e || o === fe(e) || o === on(fe(e)))) return s;
    }
    const i = bi(n[A] || s[A], e) || bi(n.appContext[A], e);
    return !i && r ? s : i;
  }
}
function bi(A, e) {
  return A && (A[e] || A[fe(e)] || A[on(fe(e))]);
}
const fs = (A) => (A ? (Va(A) ? wn(A) || A.proxy : fs(A.parent)) : null),
  Vt = yA(Object.create(null), {
    $: (A) => A,
    $el: (A) => A.vnode.el,
    $data: (A) => A.data,
    $props: (A) => A.props,
    $attrs: (A) => A.attrs,
    $slots: (A) => A.slots,
    $refs: (A) => A.refs,
    $parent: (A) => fs(A.parent),
    $root: (A) => fs(A.root),
    $emit: (A) => A.emit,
    $options: (A) => ni(A),
    $forceUpdate: (A) => A.f || (A.f = () => ri(A.update)),
    $nextTick: (A) => A.n || (A.n = Xl.bind(A.proxy)),
    $watch: (A) => sc.bind(A),
  }),
  Ln = (A, e) => A !== oA && !A.__isScriptSetup && z(A, e),
  Fc = {
    get({ _: A }, e) {
      const {
        ctx: t,
        setupState: r,
        data: n,
        props: s,
        accessCache: i,
        type: o,
        appContext: a,
      } = A;
      let B;
      if (e[0] !== "$") {
        const C = i[e];
        if (C !== void 0)
          switch (C) {
            case 1:
              return r[e];
            case 2:
              return n[e];
            case 4:
              return t[e];
            case 3:
              return s[e];
          }
        else {
          if (Ln(r, e)) return (i[e] = 1), r[e];
          if (n !== oA && z(n, e)) return (i[e] = 2), n[e];
          if ((B = A.propsOptions[0]) && z(B, e)) return (i[e] = 3), s[e];
          if (t !== oA && z(t, e)) return (i[e] = 4), t[e];
          gs && (i[e] = 0);
        }
      }
      const l = Vt[e];
      let c, f;
      if (l) return e === "$attrs" && SA(A, "get", e), l(A);
      if ((c = o.__cssModules) && (c = c[e])) return c;
      if (t !== oA && z(t, e)) return (i[e] = 4), t[e];
      if (((f = a.config.globalProperties), z(f, e))) return f[e];
    },
    set({ _: A }, e, t) {
      const { data: r, setupState: n, ctx: s } = A;
      return Ln(n, e)
        ? ((n[e] = t), !0)
        : r !== oA && z(r, e)
        ? ((r[e] = t), !0)
        : z(A.props, e) || (e[0] === "$" && e.slice(1) in A)
        ? !1
        : ((s[e] = t), !0);
    },
    has(
      {
        _: {
          data: A,
          setupState: e,
          accessCache: t,
          ctx: r,
          appContext: n,
          propsOptions: s,
        },
      },
      i
    ) {
      let o;
      return (
        !!t[i] ||
        (A !== oA && z(A, i)) ||
        Ln(e, i) ||
        ((o = s[0]) && z(o, i)) ||
        z(r, i) ||
        z(Vt, i) ||
        z(n.config.globalProperties, i)
      );
    },
    defineProperty(A, e, t) {
      return (
        t.get != null
          ? (A._.accessCache[e] = 0)
          : z(t, "value") && this.set(A, e, t.value, null),
        Reflect.defineProperty(A, e, t)
      );
    },
  };
let gs = !0;
function pc(A) {
  const e = ni(A),
    t = A.proxy,
    r = A.ctx;
  (gs = !1), e.beforeCreate && Ki(e.beforeCreate, A, "bc");
  const {
    data: n,
    computed: s,
    methods: i,
    watch: o,
    provide: a,
    inject: B,
    created: l,
    beforeMount: c,
    mounted: f,
    beforeUpdate: C,
    updated: d,
    activated: Q,
    deactivated: _,
    beforeDestroy: E,
    beforeUnmount: I,
    destroyed: b,
    unmounted: O,
    render: S,
    renderTracked: m,
    renderTriggered: N,
    errorCaptured: x,
    serverPrefetch: D,
    expose: k,
    inheritAttrs: tA,
    components: aA,
    directives: J,
    filters: lA,
  } = e;
  if ((B && Ec(B, r, null, A.appContext.config.unwrapInjectedRef), i))
    for (const W in i) {
      const j = i[W];
      X(j) && (r[W] = j.bind(t));
    }
  if (n) {
    const W = n.call(t, t);
    cA(W) && (A.data = qs(W));
  }
  if (((gs = !0), s))
    for (const W in s) {
      const j = s[W],
        dA = X(j) ? j.bind(t, t) : X(j.get) ? j.get.bind(t, t) : re,
        OA = !X(j) && X(j.set) ? j.set.bind(t) : re,
        bA = Au({ get: dA, set: OA });
      Object.defineProperty(r, W, {
        enumerable: !0,
        configurable: !0,
        get: () => bA.value,
        set: (CA) => (bA.value = CA),
      });
    }
  if (o) for (const W in o) xa(o[W], r, t, W);
  if (a) {
    const W = X(a) ? a.call(t) : a;
    Reflect.ownKeys(W).forEach((j) => {
      nc(j, W[j]);
    });
  }
  l && Ki(l, A, "c");
  function q(W, j) {
    P(j) ? j.forEach((dA) => W(dA.bind(t))) : j && W(j.bind(t));
  }
  if (
    (q(uc, c),
    q(Ia, f),
    q(fc, C),
    q(gc, d),
    q(Bc, Q),
    q(lc, _),
    q(dc, x),
    q(hc, m),
    q(Qc, N),
    q(ya, I),
    q(ba, O),
    q(wc, D),
    P(k))
  )
    if (k.length) {
      const W = A.exposed || (A.exposed = {});
      k.forEach((j) => {
        Object.defineProperty(W, j, {
          get: () => t[j],
          set: (dA) => (t[j] = dA),
        });
      });
    } else A.exposed || (A.exposed = {});
  S && A.render === re && (A.render = S),
    tA != null && (A.inheritAttrs = tA),
    aA && (A.components = aA),
    J && (A.directives = J);
}
function Ec(A, e, t = re, r = !1) {
  P(A) && (A = ws(A));
  for (const n in A) {
    const s = A[n];
    let i;
    cA(s)
      ? "default" in s
        ? (i = Or(s.from || n, s.default, !0))
        : (i = Or(s.from || n))
      : (i = Or(s)),
      LA(i) && r
        ? Object.defineProperty(e, n, {
            enumerable: !0,
            configurable: !0,
            get: () => i.value,
            set: (o) => (i.value = o),
          })
        : (e[n] = i);
  }
}
function Ki(A, e, t) {
  YA(P(A) ? A.map((r) => r.bind(e.proxy)) : A.bind(e.proxy), e, t);
}
function xa(A, e, t, r) {
  const n = r.includes(".") ? pa(t, r) : () => t[r];
  if (FA(A)) {
    const s = e[A];
    X(s) && Kn(n, s);
  } else if (X(A)) Kn(n, A.bind(t));
  else if (cA(A))
    if (P(A)) A.forEach((s) => xa(s, e, t, r));
    else {
      const s = X(A.handler) ? A.handler.bind(t) : e[A.handler];
      X(s) && Kn(n, s, A);
    }
}
function ni(A) {
  const e = A.type,
    { mixins: t, extends: r } = e,
    {
      mixins: n,
      optionsCache: s,
      config: { optionMergeStrategies: i },
    } = A.appContext,
    o = s.get(e);
  let a;
  return (
    o
      ? (a = o)
      : !n.length && !t && !r
      ? (a = e)
      : ((a = {}), n.length && n.forEach((B) => Jr(a, B, i, !0)), Jr(a, e, i)),
    cA(e) && s.set(e, a),
    a
  );
}
function Jr(A, e, t, r = !1) {
  const { mixins: n, extends: s } = e;
  s && Jr(A, s, t, !0), n && n.forEach((i) => Jr(A, i, t, !0));
  for (const i in e)
    if (!(r && i === "expose")) {
      const o = Hc[i] || (t && t[i]);
      A[i] = o ? o(A[i], e[i]) : e[i];
    }
  return A;
}
const Hc = {
  data: xi,
  props: Ne,
  emits: Ne,
  methods: Ne,
  computed: Ne,
  beforeCreate: KA,
  created: KA,
  beforeMount: KA,
  mounted: KA,
  beforeUpdate: KA,
  updated: KA,
  beforeDestroy: KA,
  beforeUnmount: KA,
  destroyed: KA,
  unmounted: KA,
  activated: KA,
  deactivated: KA,
  errorCaptured: KA,
  serverPrefetch: KA,
  components: Ne,
  directives: Ne,
  watch: mc,
  provide: xi,
  inject: vc,
};
function xi(A, e) {
  return e
    ? A
      ? function () {
          return yA(
            X(A) ? A.call(this, this) : A,
            X(e) ? e.call(this, this) : e
          );
        }
      : e
    : A;
}
function vc(A, e) {
  return Ne(ws(A), ws(e));
}
function ws(A) {
  if (P(A)) {
    const e = {};
    for (let t = 0; t < A.length; t++) e[A[t]] = A[t];
    return e;
  }
  return A;
}
function KA(A, e) {
  return A ? [...new Set([].concat(A, e))] : e;
}
function Ne(A, e) {
  return A ? yA(yA(Object.create(null), A), e) : e;
}
function mc(A, e) {
  if (!A) return e;
  if (!e) return A;
  const t = yA(Object.create(null), A);
  for (const r in e) t[r] = KA(A[r], e[r]);
  return t;
}
function Ic(A, e, t, r = !1) {
  const n = {},
    s = {};
  Pr(s, gn, 1), (A.propsDefaults = Object.create(null)), La(A, e, n, s);
  for (const i in A.propsOptions[0]) i in n || (n[i] = void 0);
  t ? (A.props = r ? n : _l(n)) : A.type.props ? (A.props = n) : (A.props = s),
    (A.attrs = s);
}
function yc(A, e, t, r) {
  const {
      props: n,
      attrs: s,
      vnode: { patchFlag: i },
    } = A,
    o = eA(n),
    [a] = A.propsOptions;
  let B = !1;
  if ((r || i > 0) && !(i & 16)) {
    if (i & 8) {
      const l = A.vnode.dynamicProps;
      for (let c = 0; c < l.length; c++) {
        let f = l[c];
        if (ln(A.emitsOptions, f)) continue;
        const C = e[f];
        if (a)
          if (z(s, f)) C !== s[f] && ((s[f] = C), (B = !0));
          else {
            const d = fe(f);
            n[d] = Qs(a, o, d, C, A, !1);
          }
        else C !== s[f] && ((s[f] = C), (B = !0));
      }
    }
  } else {
    La(A, e, n, s) && (B = !0);
    let l;
    for (const c in o)
      (!e || (!z(e, c) && ((l = pt(c)) === c || !z(e, l)))) &&
        (a
          ? t &&
            (t[c] !== void 0 || t[l] !== void 0) &&
            (n[c] = Qs(a, o, c, void 0, A, !0))
          : delete n[c]);
    if (s !== o) for (const c in s) (!e || !z(e, c)) && (delete s[c], (B = !0));
  }
  B && Fe(A, "set", "$attrs");
}
function La(A, e, t, r) {
  const [n, s] = A.propsOptions;
  let i = !1,
    o;
  if (e)
    for (let a in e) {
      if (Dr(a)) continue;
      const B = e[a];
      let l;
      n && z(n, (l = fe(a)))
        ? !s || !s.includes(l)
          ? (t[l] = B)
          : ((o || (o = {}))[l] = B)
        : ln(A.emitsOptions, a) ||
          ((!(a in r) || B !== r[a]) && ((r[a] = B), (i = !0)));
    }
  if (s) {
    const a = eA(t),
      B = o || oA;
    for (let l = 0; l < s.length; l++) {
      const c = s[l];
      t[c] = Qs(n, a, c, B[c], A, !z(B, c));
    }
  }
  return i;
}
function Qs(A, e, t, r, n, s) {
  const i = A[t];
  if (i != null) {
    const o = z(i, "default");
    if (o && r === void 0) {
      const a = i.default;
      if (i.type !== Function && X(a)) {
        const { propsDefaults: B } = n;
        t in B ? (r = B[t]) : (Ut(n), (r = B[t] = a.call(null, e)), ze());
      } else r = a;
    }
    i[0] &&
      (s && !o ? (r = !1) : i[1] && (r === "" || r === pt(t)) && (r = !0));
  }
  return r;
}
function Ta(A, e, t = !1) {
  const r = e.propsCache,
    n = r.get(A);
  if (n) return n;
  const s = A.props,
    i = {},
    o = [];
  let a = !1;
  if (!X(A)) {
    const l = (c) => {
      a = !0;
      const [f, C] = Ta(c, e, !0);
      yA(i, f), C && o.push(...C);
    };
    !t && e.mixins.length && e.mixins.forEach(l),
      A.extends && l(A.extends),
      A.mixins && A.mixins.forEach(l);
  }
  if (!s && !a) return cA(A) && r.set(A, wt), wt;
  if (P(s))
    for (let l = 0; l < s.length; l++) {
      const c = fe(s[l]);
      Li(c) && (i[c] = oA);
    }
  else if (s)
    for (const l in s) {
      const c = fe(l);
      if (Li(c)) {
        const f = s[l],
          C = (i[c] = P(f) || X(f) ? { type: f } : Object.assign({}, f));
        if (C) {
          const d = Si(Boolean, C.type),
            Q = Si(String, C.type);
          (C[0] = d > -1),
            (C[1] = Q < 0 || d < Q),
            (d > -1 || z(C, "default")) && o.push(c);
        }
      }
    }
  const B = [i, o];
  return cA(A) && r.set(A, B), B;
}
function Li(A) {
  return A[0] !== "$";
}
function Ti(A) {
  const e = A && A.toString().match(/^\s*(function|class) (\w+)/);
  return e ? e[2] : A === null ? "null" : "";
}
function Di(A, e) {
  return Ti(A) === Ti(e);
}
function Si(A, e) {
  return P(e) ? e.findIndex((t) => Di(t, A)) : X(e) && Di(e, A) ? 0 : -1;
}
const Da = (A) => A[0] === "_" || A === "$stable",
  si = (A) => (P(A) ? A.map(ce) : [ce(A)]),
  bc = (A, e, t) => {
    if (e._n) return e;
    const r = zl((...n) => si(e(...n)), t);
    return (r._c = !1), r;
  },
  Sa = (A, e, t) => {
    const r = A._ctx;
    for (const n in A) {
      if (Da(n)) continue;
      const s = A[n];
      if (X(s)) e[n] = bc(n, s, r);
      else if (s != null) {
        const i = si(s);
        e[n] = () => i;
      }
    }
  },
  Oa = (A, e) => {
    const t = si(e);
    A.slots.default = () => t;
  },
  Kc = (A, e) => {
    if (A.vnode.shapeFlag & 32) {
      const t = e._;
      t ? ((A.slots = eA(e)), Pr(e, "_", t)) : Sa(e, (A.slots = {}));
    } else (A.slots = {}), e && Oa(A, e);
    Pr(A.slots, gn, 1);
  },
  xc = (A, e, t) => {
    const { vnode: r, slots: n } = A;
    let s = !0,
      i = oA;
    if (r.shapeFlag & 32) {
      const o = e._;
      o
        ? t && o === 1
          ? (s = !1)
          : (yA(n, e), !t && o === 1 && delete n._)
        : ((s = !e.$stable), Sa(e, n)),
        (i = e);
    } else e && (Oa(A, e), (i = { default: 1 }));
    if (s) for (const o in n) !Da(o) && !(o in i) && delete n[o];
  };
function _a() {
  return {
    app: null,
    config: {
      isNativeTag: el,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Lc = 0;
function Tc(A, e) {
  return function (r, n = null) {
    X(r) || (r = Object.assign({}, r)), n != null && !cA(n) && (n = null);
    const s = _a(),
      i = new Set();
    let o = !1;
    const a = (s.app = {
      _uid: Lc++,
      _component: r,
      _props: n,
      _container: null,
      _context: s,
      _instance: null,
      version: ru,
      get config() {
        return s.config;
      },
      set config(B) {},
      use(B, ...l) {
        return (
          i.has(B) ||
            (B && X(B.install)
              ? (i.add(B), B.install(a, ...l))
              : X(B) && (i.add(B), B(a, ...l))),
          a
        );
      },
      mixin(B) {
        return s.mixins.includes(B) || s.mixins.push(B), a;
      },
      component(B, l) {
        return l ? ((s.components[B] = l), a) : s.components[B];
      },
      directive(B, l) {
        return l ? ((s.directives[B] = l), a) : s.directives[B];
      },
      mount(B, l, c) {
        if (!o) {
          const f = GA(r, n);
          return (
            (f.appContext = s),
            l && e ? e(f, B) : A(f, B, c),
            (o = !0),
            (a._container = B),
            (B.__vue_app__ = a),
            wn(f.component) || f.component.proxy
          );
        }
      },
      unmount() {
        o && (A(null, a._container), delete a._container.__vue_app__);
      },
      provide(B, l) {
        return (s.provides[B] = l), a;
      },
    });
    return a;
  };
}
function hs(A, e, t, r, n = !1) {
  if (P(A)) {
    A.forEach((f, C) => hs(f, e && (P(e) ? e[C] : e), t, r, n));
    return;
  }
  if (_r(r) && !n) return;
  const s = r.shapeFlag & 4 ? wn(r.component) || r.component.proxy : r.el,
    i = n ? null : s,
    { i: o, r: a } = A,
    B = e && e.r,
    l = o.refs === oA ? (o.refs = {}) : o.refs,
    c = o.setupState;
  if (
    (B != null &&
      B !== a &&
      (FA(B)
        ? ((l[B] = null), z(c, B) && (c[B] = null))
        : LA(B) && (B.value = null)),
    X(a))
  )
    Te(a, o, 12, [i, l]);
  else {
    const f = FA(a),
      C = LA(a);
    if (f || C) {
      const d = () => {
        if (A.f) {
          const Q = f ? (z(c, a) ? c[a] : l[a]) : a.value;
          n
            ? P(Q) && Ps(Q, s)
            : P(Q)
            ? Q.includes(s) || Q.push(s)
            : f
            ? ((l[a] = [s]), z(c, a) && (c[a] = l[a]))
            : ((a.value = [s]), A.k && (l[A.k] = a.value));
        } else
          f
            ? ((l[a] = i), z(c, a) && (c[a] = i))
            : C && ((a.value = i), A.k && (l[A.k] = i));
      };
      i ? ((d.id = -1), TA(d, t)) : d();
    }
  }
}
const TA = rc;
function Dc(A) {
  return Sc(A);
}
function Sc(A, e) {
  const t = ol();
  t.__VUE__ = !0;
  const {
      insert: r,
      remove: n,
      patchProp: s,
      createElement: i,
      createText: o,
      createComment: a,
      setText: B,
      setElementText: l,
      parentNode: c,
      nextSibling: f,
      setScopeId: C = re,
      insertStaticContent: d,
    } = A,
    Q = (
      u,
      w,
      h,
      F = null,
      U = null,
      v = null,
      L = !1,
      H = null,
      y = !!w.dynamicChildren
    ) => {
      if (u === w) return;
      u && !Pe(u, w) && ((F = ie(u)), CA(u, U, v, !0), (u = null)),
        w.patchFlag === -2 && ((y = !1), (w.dynamicChildren = null));
      const { type: p, ref: R, shapeFlag: M } = w;
      switch (p) {
        case fn:
          _(u, w, h, F);
          break;
        case ne:
          E(u, w, h, F);
          break;
        case Tn:
          u == null && I(w, h, F, L);
          break;
        case PA:
          aA(u, w, h, F, U, v, L, H, y);
          break;
        default:
          M & 1
            ? S(u, w, h, F, U, v, L, H, y)
            : M & 6
            ? J(u, w, h, F, U, v, L, H, y)
            : (M & 64 || M & 128) && p.process(u, w, h, F, U, v, L, H, y, At);
      }
      R != null && U && hs(R, u && u.ref, v, w || u, !w);
    },
    _ = (u, w, h, F) => {
      if (u == null) r((w.el = o(w.children)), h, F);
      else {
        const U = (w.el = u.el);
        w.children !== u.children && B(U, w.children);
      }
    },
    E = (u, w, h, F) => {
      u == null ? r((w.el = a(w.children || "")), h, F) : (w.el = u.el);
    },
    I = (u, w, h, F) => {
      [u.el, u.anchor] = d(u.children, w, h, F, u.el, u.anchor);
    },
    b = ({ el: u, anchor: w }, h, F) => {
      let U;
      for (; u && u !== w; ) (U = f(u)), r(u, h, F), (u = U);
      r(w, h, F);
    },
    O = ({ el: u, anchor: w }) => {
      let h;
      for (; u && u !== w; ) (h = f(u)), n(u), (u = h);
      n(w);
    },
    S = (u, w, h, F, U, v, L, H, y) => {
      (L = L || w.type === "svg"),
        u == null ? m(w, h, F, U, v, L, H, y) : D(u, w, U, v, L, H, y);
    },
    m = (u, w, h, F, U, v, L, H) => {
      let y, p;
      const { type: R, props: M, shapeFlag: G, transition: V, dirs: Y } = u;
      if (
        ((y = u.el = i(u.type, v, M && M.is, M)),
        G & 8
          ? l(y, u.children)
          : G & 16 &&
            x(u.children, y, null, F, U, v && R !== "foreignObject", L, H),
        Y && Re(u, null, F, "created"),
        N(y, u, u.scopeId, L, F),
        M)
      ) {
        for (const rA in M)
          rA !== "value" &&
            !Dr(rA) &&
            s(y, rA, null, M[rA], v, u.children, F, U, HA);
        "value" in M && s(y, "value", null, M.value),
          (p = M.onVnodeBeforeMount) && ae(p, F, u);
      }
      Y && Re(u, null, F, "beforeMount");
      const sA = (!U || (U && !U.pendingBranch)) && V && !V.persisted;
      sA && V.beforeEnter(y),
        r(y, w, h),
        ((p = M && M.onVnodeMounted) || sA || Y) &&
          TA(() => {
            p && ae(p, F, u), sA && V.enter(y), Y && Re(u, null, F, "mounted");
          }, U);
    },
    N = (u, w, h, F, U) => {
      if ((h && C(u, h), F)) for (let v = 0; v < F.length; v++) C(u, F[v]);
      if (U) {
        let v = U.subTree;
        if (w === v) {
          const L = U.vnode;
          N(u, L, L.scopeId, L.slotScopeIds, U.parent);
        }
      }
    },
    x = (u, w, h, F, U, v, L, H, y = 0) => {
      for (let p = y; p < u.length; p++) {
        const R = (u[p] = H ? Ie(u[p]) : ce(u[p]));
        Q(null, R, w, h, F, U, v, L, H);
      }
    },
    D = (u, w, h, F, U, v, L) => {
      const H = (w.el = u.el);
      let { patchFlag: y, dynamicChildren: p, dirs: R } = w;
      y |= u.patchFlag & 16;
      const M = u.props || oA,
        G = w.props || oA;
      let V;
      h && Ge(h, !1),
        (V = G.onVnodeBeforeUpdate) && ae(V, h, w, u),
        R && Re(w, u, h, "beforeUpdate"),
        h && Ge(h, !0);
      const Y = U && w.type !== "foreignObject";
      if (
        (p
          ? k(u.dynamicChildren, p, H, h, F, Y, v)
          : L || j(u, w, H, null, h, F, Y, v, !1),
        y > 0)
      ) {
        if (y & 16) tA(H, w, M, G, h, F, U);
        else if (
          (y & 2 && M.class !== G.class && s(H, "class", null, G.class, U),
          y & 4 && s(H, "style", M.style, G.style, U),
          y & 8)
        ) {
          const sA = w.dynamicProps;
          for (let rA = 0; rA < sA.length; rA++) {
            const wA = sA[rA],
              zA = M[wA],
              et = G[wA];
            (et !== zA || wA === "value") &&
              s(H, wA, zA, et, U, u.children, h, F, HA);
          }
        }
        y & 1 && u.children !== w.children && l(H, w.children);
      } else !L && p == null && tA(H, w, M, G, h, F, U);
      ((V = G.onVnodeUpdated) || R) &&
        TA(() => {
          V && ae(V, h, w, u), R && Re(w, u, h, "updated");
        }, F);
    },
    k = (u, w, h, F, U, v, L) => {
      for (let H = 0; H < w.length; H++) {
        const y = u[H],
          p = w[H],
          R =
            y.el && (y.type === PA || !Pe(y, p) || y.shapeFlag & 70)
              ? c(y.el)
              : h;
        Q(y, p, R, null, F, U, v, L, !0);
      }
    },
    tA = (u, w, h, F, U, v, L) => {
      if (h !== F) {
        if (h !== oA)
          for (const H in h)
            !Dr(H) && !(H in F) && s(u, H, h[H], null, L, w.children, U, v, HA);
        for (const H in F) {
          if (Dr(H)) continue;
          const y = F[H],
            p = h[H];
          y !== p && H !== "value" && s(u, H, p, y, L, w.children, U, v, HA);
        }
        "value" in F && s(u, "value", h.value, F.value);
      }
    },
    aA = (u, w, h, F, U, v, L, H, y) => {
      const p = (w.el = u ? u.el : o("")),
        R = (w.anchor = u ? u.anchor : o(""));
      let { patchFlag: M, dynamicChildren: G, slotScopeIds: V } = w;
      V && (H = H ? H.concat(V) : V),
        u == null
          ? (r(p, h, F), r(R, h, F), x(w.children, h, R, U, v, L, H, y))
          : M > 0 && M & 64 && G && u.dynamicChildren
          ? (k(u.dynamicChildren, G, h, U, v, L, H),
            (w.key != null || (U && w === U.subTree)) && Ma(u, w, !0))
          : j(u, w, h, R, U, v, L, H, y);
    },
    J = (u, w, h, F, U, v, L, H, y) => {
      (w.slotScopeIds = H),
        u == null
          ? w.shapeFlag & 512
            ? U.ctx.activate(w, h, F, L, y)
            : lA(w, h, F, U, v, L, y)
          : ZA(u, w, y);
    },
    lA = (u, w, h, F, U, v, L) => {
      const H = (u.component = Jc(u, F, U));
      if ((cn(u) && (H.ctx.renderer = At), Yc(H), H.asyncDep)) {
        if ((U && U.registerDep(H, q), !u.el)) {
          const y = (H.subTree = GA(ne));
          E(null, y, w, h);
        }
        return;
      }
      q(H, u, w, h, U, v, L);
    },
    ZA = (u, w, h) => {
      const F = (w.component = u.component);
      if (Ac(u, w, h))
        if (F.asyncDep && !F.asyncResolved) {
          W(F, w, h);
          return;
        } else (F.next = w), Wl(F.update), F.update();
      else (w.el = u.el), (F.vnode = w);
    },
    q = (u, w, h, F, U, v, L) => {
      const H = () => {
          if (u.isMounted) {
            let { next: R, bu: M, u: G, parent: V, vnode: Y } = u,
              sA = R,
              rA;
            Ge(u, !1),
              R ? ((R.el = Y.el), W(u, R, L)) : (R = Y),
              M && Sr(M),
              (rA = R.props && R.props.onVnodeBeforeUpdate) && ae(rA, V, R, Y),
              Ge(u, !0);
            const wA = bn(u),
              zA = u.subTree;
            (u.subTree = wA),
              Q(zA, wA, c(zA.el), ie(zA), u, U, v),
              (R.el = wA.el),
              sA === null && ec(u, wA.el),
              G && TA(G, U),
              (rA = R.props && R.props.onVnodeUpdated) &&
                TA(() => ae(rA, V, R, Y), U);
          } else {
            let R;
            const { el: M, props: G } = w,
              { bm: V, m: Y, parent: sA } = u,
              rA = _r(w);
            if (
              (Ge(u, !1),
              V && Sr(V),
              !rA && (R = G && G.onVnodeBeforeMount) && ae(R, sA, w),
              Ge(u, !0),
              M && In)
            ) {
              const wA = () => {
                (u.subTree = bn(u)), In(M, u.subTree, u, U, null);
              };
              rA
                ? w.type.__asyncLoader().then(() => !u.isUnmounted && wA())
                : wA();
            } else {
              const wA = (u.subTree = bn(u));
              Q(null, wA, h, F, u, U, v), (w.el = wA.el);
            }
            if ((Y && TA(Y, U), !rA && (R = G && G.onVnodeMounted))) {
              const wA = w;
              TA(() => ae(R, sA, wA), U);
            }
            (w.shapeFlag & 256 ||
              (sA && _r(sA.vnode) && sA.vnode.shapeFlag & 256)) &&
              u.a &&
              TA(u.a, U),
              (u.isMounted = !0),
              (w = h = F = null);
          }
        },
        y = (u.effect = new Ys(H, () => ri(p), u.scope)),
        p = (u.update = () => y.run());
      (p.id = u.uid), Ge(u, !0), p();
    },
    W = (u, w, h) => {
      w.component = u;
      const F = u.vnode.props;
      (u.vnode = w),
        (u.next = null),
        yc(u, w.props, F, h),
        xc(u, w.children, h),
        Et(),
        mi(),
        Ht();
    },
    j = (u, w, h, F, U, v, L, H, y = !1) => {
      const p = u && u.children,
        R = u ? u.shapeFlag : 0,
        M = w.children,
        { patchFlag: G, shapeFlag: V } = w;
      if (G > 0) {
        if (G & 128) {
          OA(p, M, h, F, U, v, L, H, y);
          return;
        } else if (G & 256) {
          dA(p, M, h, F, U, v, L, H, y);
          return;
        }
      }
      V & 8
        ? (R & 16 && HA(p, U, v), M !== p && l(h, M))
        : R & 16
        ? V & 16
          ? OA(p, M, h, F, U, v, L, H, y)
          : HA(p, U, v, !0)
        : (R & 8 && l(h, ""), V & 16 && x(M, h, F, U, v, L, H, y));
    },
    dA = (u, w, h, F, U, v, L, H, y) => {
      (u = u || wt), (w = w || wt);
      const p = u.length,
        R = w.length,
        M = Math.min(p, R);
      let G;
      for (G = 0; G < M; G++) {
        const V = (w[G] = y ? Ie(w[G]) : ce(w[G]));
        Q(u[G], V, h, null, U, v, L, H, y);
      }
      p > R ? HA(u, U, v, !0, !1, M) : x(w, h, F, U, v, L, H, y, M);
    },
    OA = (u, w, h, F, U, v, L, H, y) => {
      let p = 0;
      const R = w.length;
      let M = u.length - 1,
        G = R - 1;
      for (; p <= M && p <= G; ) {
        const V = u[p],
          Y = (w[p] = y ? Ie(w[p]) : ce(w[p]));
        if (Pe(V, Y)) Q(V, Y, h, null, U, v, L, H, y);
        else break;
        p++;
      }
      for (; p <= M && p <= G; ) {
        const V = u[M],
          Y = (w[G] = y ? Ie(w[G]) : ce(w[G]));
        if (Pe(V, Y)) Q(V, Y, h, null, U, v, L, H, y);
        else break;
        M--, G--;
      }
      if (p > M) {
        if (p <= G) {
          const V = G + 1,
            Y = V < R ? w[V].el : F;
          for (; p <= G; )
            Q(null, (w[p] = y ? Ie(w[p]) : ce(w[p])), h, Y, U, v, L, H, y), p++;
        }
      } else if (p > G) for (; p <= M; ) CA(u[p], U, v, !0), p++;
      else {
        const V = p,
          Y = p,
          sA = new Map();
        for (p = Y; p <= G; p++) {
          const _A = (w[p] = y ? Ie(w[p]) : ce(w[p]));
          _A.key != null && sA.set(_A.key, p);
        }
        let rA,
          wA = 0;
        const zA = G - Y + 1;
        let et = !1,
          wi = 0;
        const mt = new Array(zA);
        for (p = 0; p < zA; p++) mt[p] = 0;
        for (p = V; p <= M; p++) {
          const _A = u[p];
          if (wA >= zA) {
            CA(_A, U, v, !0);
            continue;
          }
          let oe;
          if (_A.key != null) oe = sA.get(_A.key);
          else
            for (rA = Y; rA <= G; rA++)
              if (mt[rA - Y] === 0 && Pe(_A, w[rA])) {
                oe = rA;
                break;
              }
          oe === void 0
            ? CA(_A, U, v, !0)
            : ((mt[oe - Y] = p + 1),
              oe >= wi ? (wi = oe) : (et = !0),
              Q(_A, w[oe], h, null, U, v, L, H, y),
              wA++);
        }
        const Qi = et ? Oc(mt) : wt;
        for (rA = Qi.length - 1, p = zA - 1; p >= 0; p--) {
          const _A = Y + p,
            oe = w[_A],
            hi = _A + 1 < R ? w[_A + 1].el : F;
          mt[p] === 0
            ? Q(null, oe, h, hi, U, v, L, H, y)
            : et && (rA < 0 || p !== Qi[rA] ? bA(oe, h, hi, 2) : rA--);
        }
      }
    },
    bA = (u, w, h, F, U = null) => {
      const { el: v, type: L, transition: H, children: y, shapeFlag: p } = u;
      if (p & 6) {
        bA(u.component.subTree, w, h, F);
        return;
      }
      if (p & 128) {
        u.suspense.move(w, h, F);
        return;
      }
      if (p & 64) {
        L.move(u, w, h, At);
        return;
      }
      if (L === PA) {
        r(v, w, h);
        for (let M = 0; M < y.length; M++) bA(y[M], w, h, F);
        r(u.anchor, w, h);
        return;
      }
      if (L === Tn) {
        b(u, w, h);
        return;
      }
      if (F !== 2 && p & 1 && H)
        if (F === 0) H.beforeEnter(v), r(v, w, h), TA(() => H.enter(v), U);
        else {
          const { leave: M, delayLeave: G, afterLeave: V } = H,
            Y = () => r(v, w, h),
            sA = () => {
              M(v, () => {
                Y(), V && V();
              });
            };
          G ? G(v, Y, sA) : sA();
        }
      else r(v, w, h);
    },
    CA = (u, w, h, F = !1, U = !1) => {
      const {
        type: v,
        props: L,
        ref: H,
        children: y,
        dynamicChildren: p,
        shapeFlag: R,
        patchFlag: M,
        dirs: G,
      } = u;
      if ((H != null && hs(H, null, h, u, !0), R & 256)) {
        w.ctx.deactivate(u);
        return;
      }
      const V = R & 1 && G,
        Y = !_r(u);
      let sA;
      if ((Y && (sA = L && L.onVnodeBeforeUnmount) && ae(sA, w, u), R & 6))
        jA(u.component, h, F);
      else {
        if (R & 128) {
          u.suspense.unmount(h, F);
          return;
        }
        V && Re(u, null, w, "beforeUnmount"),
          R & 64
            ? u.type.remove(u, w, h, U, At, F)
            : p && (v !== PA || (M > 0 && M & 64))
            ? HA(p, w, h, !1, !0)
            : ((v === PA && M & 384) || (!U && R & 16)) && HA(y, w, h),
          F && VA(u);
      }
      ((Y && (sA = L && L.onVnodeUnmounted)) || V) &&
        TA(() => {
          sA && ae(sA, w, u), V && Re(u, null, w, "unmounted");
        }, h);
    },
    VA = (u) => {
      const { type: w, el: h, anchor: F, transition: U } = u;
      if (w === PA) {
        Qe(h, F);
        return;
      }
      if (w === Tn) {
        O(u);
        return;
      }
      const v = () => {
        n(h), U && !U.persisted && U.afterLeave && U.afterLeave();
      };
      if (u.shapeFlag & 1 && U && !U.persisted) {
        const { leave: L, delayLeave: H } = U,
          y = () => L(h, v);
        H ? H(u.el, v, y) : y();
      } else v();
    },
    Qe = (u, w) => {
      let h;
      for (; u !== w; ) (h = f(u)), n(u), (u = h);
      n(w);
    },
    jA = (u, w, h) => {
      const { bum: F, scope: U, update: v, subTree: L, um: H } = u;
      F && Sr(F),
        U.stop(),
        v && ((v.active = !1), CA(L, u, w, h)),
        H && TA(H, w),
        TA(() => {
          u.isUnmounted = !0;
        }, w),
        w &&
          w.pendingBranch &&
          !w.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === w.pendingId &&
          (w.deps--, w.deps === 0 && w.resolve());
    },
    HA = (u, w, h, F = !1, U = !1, v = 0) => {
      for (let L = v; L < u.length; L++) CA(u[L], w, h, F, U);
    },
    ie = (u) =>
      u.shapeFlag & 6
        ? ie(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : f(u.anchor || u.el),
    gi = (u, w, h) => {
      u == null
        ? w._vnode && CA(w._vnode, null, null, !0)
        : Q(w._vnode || null, u, w, null, null, null, h),
        mi(),
        ha(),
        (w._vnode = u);
    },
    At = {
      p: Q,
      um: CA,
      m: bA,
      r: VA,
      mt: lA,
      mc: x,
      pc: j,
      pbc: k,
      n: ie,
      o: A,
    };
  let mn, In;
  return (
    e && ([mn, In] = e(At)), { render: gi, hydrate: mn, createApp: Tc(gi, mn) }
  );
}
function Ge({ effect: A, update: e }, t) {
  A.allowRecurse = e.allowRecurse = t;
}
function Ma(A, e, t = !1) {
  const r = A.children,
    n = e.children;
  if (P(r) && P(n))
    for (let s = 0; s < r.length; s++) {
      const i = r[s];
      let o = n[s];
      o.shapeFlag & 1 &&
        !o.dynamicChildren &&
        ((o.patchFlag <= 0 || o.patchFlag === 32) &&
          ((o = n[s] = Ie(n[s])), (o.el = i.el)),
        t || Ma(i, o)),
        o.type === fn && (o.el = i.el);
    }
}
function Oc(A) {
  const e = A.slice(),
    t = [0];
  let r, n, s, i, o;
  const a = A.length;
  for (r = 0; r < a; r++) {
    const B = A[r];
    if (B !== 0) {
      if (((n = t[t.length - 1]), A[n] < B)) {
        (e[r] = n), t.push(r);
        continue;
      }
      for (s = 0, i = t.length - 1; s < i; )
        (o = (s + i) >> 1), A[t[o]] < B ? (s = o + 1) : (i = o);
      B < A[t[s]] && (s > 0 && (e[r] = t[s - 1]), (t[s] = r));
    }
  }
  for (s = t.length, i = t[s - 1]; s-- > 0; ) (t[s] = i), (i = e[i]);
  return t;
}
const _c = (A) => A.__isTeleport,
  PA = Symbol(void 0),
  fn = Symbol(void 0),
  ne = Symbol(void 0),
  Tn = Symbol(void 0),
  Nt = [];
let te = null;
function Ae(A = !1) {
  Nt.push((te = A ? null : []));
}
function Mc() {
  Nt.pop(), (te = Nt[Nt.length - 1] || null);
}
let zt = 1;
function Oi(A) {
  zt += A;
}
function Ra(A) {
  return (
    (A.dynamicChildren = zt > 0 ? te || wt : null),
    Mc(),
    zt > 0 && te && te.push(A),
    A
  );
}
function le(A, e, t, r, n, s) {
  return Ra(g(A, e, t, r, n, s, !0));
}
function Rc(A, e, t, r, n) {
  return Ra(GA(A, e, t, r, n, !0));
}
function Gc(A) {
  return A ? A.__v_isVNode === !0 : !1;
}
function Pe(A, e) {
  return A.type === e.type && A.key === e.key;
}
const gn = "__vInternal",
  Ga = ({ key: A }) => A ?? null,
  Mr = ({ ref: A, ref_key: e, ref_for: t }) =>
    A != null
      ? FA(A) || LA(A) || X(A)
        ? { i: RA, r: A, k: e, f: !!t }
        : A
      : null;
function g(
  A,
  e = null,
  t = null,
  r = 0,
  n = null,
  s = A === PA ? 0 : 1,
  i = !1,
  o = !1
) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: A,
    props: e,
    key: e && Ga(e),
    ref: e && Mr(e),
    scopeId: Ua,
    slotScopeIds: null,
    children: t,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: n,
    dynamicChildren: null,
    appContext: null,
    ctx: RA,
  };
  return (
    o
      ? (ii(a, t), s & 128 && A.normalize(a))
      : t && (a.shapeFlag |= FA(t) ? 8 : 16),
    zt > 0 &&
      !i &&
      te &&
      (a.patchFlag > 0 || s & 6) &&
      a.patchFlag !== 32 &&
      te.push(a),
    a
  );
}
const GA = Vc;
function Vc(A, e = null, t = null, r = 0, n = null, s = !1) {
  if (((!A || A === Cc) && (A = ne), Gc(A))) {
    const o = _e(A, e, !0);
    return (
      t && ii(o, t),
      zt > 0 &&
        !s &&
        te &&
        (o.shapeFlag & 6 ? (te[te.indexOf(A)] = o) : te.push(o)),
      (o.patchFlag |= -2),
      o
    );
  }
  if (($c(A) && (A = A.__vccOpts), e)) {
    e = Nc(e);
    let { class: o, style: a } = e;
    o && !FA(o) && (e.class = gt(o)),
      cA(a) && (ca(a) && !P(a) && (a = yA({}, a)), (e.style = Ze(a)));
  }
  const i = FA(A) ? 1 : tc(A) ? 128 : _c(A) ? 64 : cA(A) ? 4 : X(A) ? 2 : 0;
  return g(A, e, t, r, n, i, s, !0);
}
function Nc(A) {
  return A ? (ca(A) || gn in A ? yA({}, A) : A) : null;
}
function _e(A, e, t = !1) {
  const { props: r, ref: n, patchFlag: s, children: i } = A,
    o = e ? kc(r || {}, e) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: A.type,
    props: o,
    key: o && Ga(o),
    ref:
      e && e.ref ? (t && n ? (P(n) ? n.concat(Mr(e)) : [n, Mr(e)]) : Mr(e)) : n,
    scopeId: A.scopeId,
    slotScopeIds: A.slotScopeIds,
    children: i,
    target: A.target,
    targetAnchor: A.targetAnchor,
    staticCount: A.staticCount,
    shapeFlag: A.shapeFlag,
    patchFlag: e && A.type !== PA ? (s === -1 ? 16 : s | 16) : s,
    dynamicProps: A.dynamicProps,
    dynamicChildren: A.dynamicChildren,
    appContext: A.appContext,
    dirs: A.dirs,
    transition: A.transition,
    component: A.component,
    suspense: A.suspense,
    ssContent: A.ssContent && _e(A.ssContent),
    ssFallback: A.ssFallback && _e(A.ssFallback),
    el: A.el,
    anchor: A.anchor,
    ctx: A.ctx,
    ce: A.ce,
  };
}
function qt(A = " ", e = 0) {
  return GA(fn, null, A, e);
}
function at(A = "", e = !1) {
  return e ? (Ae(), Rc(ne, null, A)) : GA(ne, null, A);
}
function ce(A) {
  return A == null || typeof A == "boolean"
    ? GA(ne)
    : P(A)
    ? GA(PA, null, A.slice())
    : typeof A == "object"
    ? Ie(A)
    : GA(fn, null, String(A));
}
function Ie(A) {
  return (A.el === null && A.patchFlag !== -1) || A.memo ? A : _e(A);
}
function ii(A, e) {
  let t = 0;
  const { shapeFlag: r } = A;
  if (e == null) e = null;
  else if (P(e)) t = 16;
  else if (typeof e == "object")
    if (r & 65) {
      const n = e.default;
      n && (n._c && (n._d = !1), ii(A, n()), n._c && (n._d = !0));
      return;
    } else {
      t = 32;
      const n = e._;
      !n && !(gn in e)
        ? (e._ctx = RA)
        : n === 3 &&
          RA &&
          (RA.slots._ === 1 ? (e._ = 1) : ((e._ = 2), (A.patchFlag |= 1024)));
    }
  else
    X(e)
      ? ((e = { default: e, _ctx: RA }), (t = 32))
      : ((e = String(e)), r & 64 ? ((t = 16), (e = [qt(e)])) : (t = 8));
  (A.children = e), (A.shapeFlag |= t);
}
function kc(...A) {
  const e = {};
  for (let t = 0; t < A.length; t++) {
    const r = A[t];
    for (const n in r)
      if (n === "class")
        e.class !== r.class && (e.class = gt([e.class, r.class]));
      else if (n === "style") e.style = Ze([e.style, r.style]);
      else if (rn(n)) {
        const s = e[n],
          i = r[n];
        i &&
          s !== i &&
          !(P(s) && s.includes(i)) &&
          (e[n] = s ? [].concat(s, i) : i);
      } else n !== "" && (e[n] = r[n]);
  }
  return e;
}
function ae(A, e, t, r = null) {
  YA(A, e, 7, [t, r]);
}
const Pc = _a();
let Xc = 0;
function Jc(A, e, t) {
  const r = A.type,
    n = (e ? e.appContext : A.appContext) || Pc,
    s = {
      uid: Xc++,
      vnode: A,
      type: r,
      parent: e,
      appContext: n,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new al(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: e ? e.provides : Object.create(n.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ta(r, n),
      emitsOptions: Ca(r, n),
      emit: null,
      emitted: null,
      propsDefaults: oA,
      inheritAttrs: r.inheritAttrs,
      ctx: oA,
      data: oA,
      props: oA,
      attrs: oA,
      slots: oA,
      refs: oA,
      setupState: oA,
      setupContext: null,
      suspense: t,
      suspenseId: t ? t.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (s.ctx = { _: s }),
    (s.root = e ? e.root : s),
    (s.emit = jl.bind(null, s)),
    A.ce && A.ce(s),
    s
  );
}
let gA = null;
const Wc = () => gA || RA,
  Ut = (A) => {
    (gA = A), A.scope.on();
  },
  ze = () => {
    gA && gA.scope.off(), (gA = null);
  };
function Va(A) {
  return A.vnode.shapeFlag & 4;
}
let $t = !1;
function Yc(A, e = !1) {
  $t = e;
  const { props: t, children: r } = A.vnode,
    n = Va(A);
  Ic(A, t, n, e), Kc(A, r);
  const s = n ? Zc(A, e) : void 0;
  return ($t = !1), s;
}
function Zc(A, e) {
  const t = A.type;
  (A.accessCache = Object.create(null)), (A.proxy = ua(new Proxy(A.ctx, Fc)));
  const { setup: r } = t;
  if (r) {
    const n = (A.setupContext = r.length > 1 ? zc(A) : null);
    Ut(A), Et();
    const s = Te(r, A, 0, [A.props, n]);
    if ((Ht(), ze(), zo(s))) {
      if ((s.then(ze, ze), e))
        return s
          .then((i) => {
            _i(A, i, e);
          })
          .catch((i) => {
            Bn(i, A, 0);
          });
      A.asyncDep = s;
    } else _i(A, s, e);
  } else Na(A, e);
}
function _i(A, e, t) {
  X(e)
    ? A.type.__ssrInlineRender
      ? (A.ssrRender = e)
      : (A.render = e)
    : cA(e) && (A.setupState = fa(e)),
    Na(A, t);
}
let Mi;
function Na(A, e, t) {
  const r = A.type;
  if (!A.render) {
    if (!e && Mi && !r.render) {
      const n = r.template || ni(A).template;
      if (n) {
        const { isCustomElement: s, compilerOptions: i } = A.appContext.config,
          { delimiters: o, compilerOptions: a } = r,
          B = yA(yA({ isCustomElement: s, delimiters: o }, i), a);
        r.render = Mi(n, B);
      }
    }
    A.render = r.render || re;
  }
  Ut(A), Et(), pc(A), Ht(), ze();
}
function jc(A) {
  return new Proxy(A.attrs, {
    get(e, t) {
      return SA(A, "get", "$attrs"), e[t];
    },
  });
}
function zc(A) {
  const e = (r) => {
    A.exposed = r || {};
  };
  let t;
  return {
    get attrs() {
      return t || (t = jc(A));
    },
    slots: A.slots,
    emit: A.emit,
    expose: e,
  };
}
function wn(A) {
  if (A.exposed)
    return (
      A.exposeProxy ||
      (A.exposeProxy = new Proxy(fa(ua(A.exposed)), {
        get(e, t) {
          if (t in e) return e[t];
          if (t in Vt) return Vt[t](A);
        },
        has(e, t) {
          return t in e || t in Vt;
        },
      }))
    );
}
function qc(A, e = !0) {
  return X(A) ? A.displayName || A.name : A.name || (e && A.__name);
}
function $c(A) {
  return X(A) && "__vccOpts" in A;
}
const Au = (A, e) => kl(A, e, $t),
  eu = Symbol(""),
  tu = () => Or(eu),
  ru = "3.2.47",
  nu = "http://www.w3.org/2000/svg",
  Xe = typeof document < "u" ? document : null,
  Ri = Xe && Xe.createElement("template"),
  su = {
    insert: (A, e, t) => {
      e.insertBefore(A, t || null);
    },
    remove: (A) => {
      const e = A.parentNode;
      e && e.removeChild(A);
    },
    createElement: (A, e, t, r) => {
      const n = e
        ? Xe.createElementNS(nu, A)
        : Xe.createElement(A, t ? { is: t } : void 0);
      return (
        A === "select" &&
          r &&
          r.multiple != null &&
          n.setAttribute("multiple", r.multiple),
        n
      );
    },
    createText: (A) => Xe.createTextNode(A),
    createComment: (A) => Xe.createComment(A),
    setText: (A, e) => {
      A.nodeValue = e;
    },
    setElementText: (A, e) => {
      A.textContent = e;
    },
    parentNode: (A) => A.parentNode,
    nextSibling: (A) => A.nextSibling,
    querySelector: (A) => Xe.querySelector(A),
    setScopeId(A, e) {
      A.setAttribute(e, "");
    },
    insertStaticContent(A, e, t, r, n, s) {
      const i = t ? t.previousSibling : e.lastChild;
      if (n && (n === s || n.nextSibling))
        for (
          ;
          e.insertBefore(n.cloneNode(!0), t),
            !(n === s || !(n = n.nextSibling));

        );
      else {
        Ri.innerHTML = r ? `<svg>${A}</svg>` : A;
        const o = Ri.content;
        if (r) {
          const a = o.firstChild;
          for (; a.firstChild; ) o.appendChild(a.firstChild);
          o.removeChild(a);
        }
        e.insertBefore(o, t);
      }
      return [
        i ? i.nextSibling : e.firstChild,
        t ? t.previousSibling : e.lastChild,
      ];
    },
  };
function iu(A, e, t) {
  const r = A._vtc;
  r && (e = (e ? [e, ...r] : [...r]).join(" ")),
    e == null
      ? A.removeAttribute("class")
      : t
      ? A.setAttribute("class", e)
      : (A.className = e);
}
function ou(A, e, t) {
  const r = A.style,
    n = FA(t);
  if (t && !n) {
    if (e && !FA(e)) for (const s in e) t[s] == null && ds(r, s, "");
    for (const s in t) ds(r, s, t[s]);
  } else {
    const s = r.display;
    n ? e !== t && (r.cssText = t) : e && A.removeAttribute("style"),
      "_vod" in A && (r.display = s);
  }
}
const Gi = /\s*!important$/;
function ds(A, e, t) {
  if (P(t)) t.forEach((r) => ds(A, e, r));
  else if ((t == null && (t = ""), e.startsWith("--"))) A.setProperty(e, t);
  else {
    const r = au(A, e);
    Gi.test(t)
      ? A.setProperty(pt(r), t.replace(Gi, ""), "important")
      : (A[r] = t);
  }
}
const Vi = ["Webkit", "Moz", "ms"],
  Dn = {};
function au(A, e) {
  const t = Dn[e];
  if (t) return t;
  let r = fe(e);
  if (r !== "filter" && r in A) return (Dn[e] = r);
  r = on(r);
  for (let n = 0; n < Vi.length; n++) {
    const s = Vi[n] + r;
    if (s in A) return (Dn[e] = s);
  }
  return e;
}
const Ni = "http://www.w3.org/1999/xlink";
function Bu(A, e, t, r, n) {
  if (r && e.startsWith("xlink:"))
    t == null
      ? A.removeAttributeNS(Ni, e.slice(6, e.length))
      : A.setAttributeNS(Ni, e, t);
  else {
    const s = Al(e);
    t == null || (s && !Yo(t))
      ? A.removeAttribute(e)
      : A.setAttribute(e, s ? "" : t);
  }
}
function lu(A, e, t, r, n, s, i) {
  if (e === "innerHTML" || e === "textContent") {
    r && i(r, n, s), (A[e] = t ?? "");
    return;
  }
  if (e === "value" && A.tagName !== "PROGRESS" && !A.tagName.includes("-")) {
    A._value = t;
    const a = t ?? "";
    (A.value !== a || A.tagName === "OPTION") && (A.value = a),
      t == null && A.removeAttribute(e);
    return;
  }
  let o = !1;
  if (t === "" || t == null) {
    const a = typeof A[e];
    a === "boolean"
      ? (t = Yo(t))
      : t == null && a === "string"
      ? ((t = ""), (o = !0))
      : a === "number" && ((t = 0), (o = !0));
  }
  try {
    A[e] = t;
  } catch {}
  o && A.removeAttribute(e);
}
function Bt(A, e, t, r) {
  A.addEventListener(e, t, r);
}
function cu(A, e, t, r) {
  A.removeEventListener(e, t, r);
}
function uu(A, e, t, r, n = null) {
  const s = A._vei || (A._vei = {}),
    i = s[e];
  if (r && i) i.value = r;
  else {
    const [o, a] = fu(e);
    if (r) {
      const B = (s[e] = Qu(r, n));
      Bt(A, o, B, a);
    } else i && (cu(A, o, i, a), (s[e] = void 0));
  }
}
const ki = /(?:Once|Passive|Capture)$/;
function fu(A) {
  let e;
  if (ki.test(A)) {
    e = {};
    let r;
    for (; (r = A.match(ki)); )
      (A = A.slice(0, A.length - r[0].length)), (e[r[0].toLowerCase()] = !0);
  }
  return [A[2] === ":" ? A.slice(3) : pt(A.slice(2)), e];
}
let Sn = 0;
const gu = Promise.resolve(),
  wu = () => Sn || (gu.then(() => (Sn = 0)), (Sn = Date.now()));
function Qu(A, e) {
  const t = (r) => {
    if (!r._vts) r._vts = Date.now();
    else if (r._vts <= t.attached) return;
    YA(hu(r, t.value), e, 5, [r]);
  };
  return (t.value = A), (t.attached = wu()), t;
}
function hu(A, e) {
  if (P(e)) {
    const t = A.stopImmediatePropagation;
    return (
      (A.stopImmediatePropagation = () => {
        t.call(A), (A._stopped = !0);
      }),
      e.map((r) => (n) => !n._stopped && r && r(n))
    );
  } else return e;
}
const Pi = /^on[a-z]/,
  du = (A, e, t, r, n = !1, s, i, o, a) => {
    e === "class"
      ? iu(A, r, n)
      : e === "style"
      ? ou(A, t, r)
      : rn(e)
      ? ks(e) || uu(A, e, t, r, i)
      : (
          e[0] === "."
            ? ((e = e.slice(1)), !0)
            : e[0] === "^"
            ? ((e = e.slice(1)), !1)
            : Cu(A, e, r, n)
        )
      ? lu(A, e, r, s, i, o, a)
      : (e === "true-value"
          ? (A._trueValue = r)
          : e === "false-value" && (A._falseValue = r),
        Bu(A, e, r, n));
  };
function Cu(A, e, t, r) {
  return r
    ? !!(
        e === "innerHTML" ||
        e === "textContent" ||
        (e in A && Pi.test(e) && X(t))
      )
    : e === "spellcheck" ||
      e === "draggable" ||
      e === "translate" ||
      e === "form" ||
      (e === "list" && A.tagName === "INPUT") ||
      (e === "type" && A.tagName === "TEXTAREA") ||
      (Pi.test(e) && FA(t))
    ? !1
    : e in A;
}
const Uu = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
ac.props;
const Xi = (A) => {
  const e = A.props["onUpdate:modelValue"] || !1;
  return P(e) ? (t) => Sr(e, t) : e;
};
function Fu(A) {
  A.target.composing = !0;
}
function Ji(A) {
  const e = A.target;
  e.composing && ((e.composing = !1), e.dispatchEvent(new Event("input")));
}
const yt = {
    created(A, { modifiers: { lazy: e, trim: t, number: r } }, n) {
      A._assign = Xi(n);
      const s = r || (n.props && n.props.type === "number");
      Bt(A, e ? "change" : "input", (i) => {
        if (i.target.composing) return;
        let o = A.value;
        t && (o = o.trim()), s && (o = rs(o)), A._assign(o);
      }),
        t &&
          Bt(A, "change", () => {
            A.value = A.value.trim();
          }),
        e ||
          (Bt(A, "compositionstart", Fu),
          Bt(A, "compositionend", Ji),
          Bt(A, "change", Ji));
    },
    mounted(A, { value: e }) {
      A.value = e ?? "";
    },
    beforeUpdate(
      A,
      { value: e, modifiers: { lazy: t, trim: r, number: n } },
      s
    ) {
      if (
        ((A._assign = Xi(s)),
        A.composing ||
          (document.activeElement === A &&
            A.type !== "range" &&
            (t ||
              (r && A.value.trim() === e) ||
              ((n || A.type === "number") && rs(A.value) === e))))
      )
        return;
      const i = e ?? "";
      A.value !== i && (A.value = i);
    },
  },
  pu = yA({ patchProp: du }, su);
let Wi;
function Eu() {
  return Wi || (Wi = Dc(pu));
}
const Hu = (...A) => {
  const e = Eu().createApp(...A),
    { mount: t } = e;
  return (
    (e.mount = (r) => {
      const n = vu(r);
      if (!n) return;
      const s = e._component;
      !X(s) && !s.render && !s.template && (s.template = n.innerHTML),
        (n.innerHTML = "");
      const i = t(n, !1, n instanceof SVGElement);
      return (
        n instanceof Element &&
          (n.removeAttribute("v-cloak"), n.setAttribute("data-v-app", "")),
        i
      );
    }),
    e
  );
};
function vu(A) {
  return FA(A) ? document.querySelector(A) : A;
}
var ka = va({
  props: {
    icon: String,
    iconColor: { type: String, default: "#ffffff" },
    iconType: String,
    iconSize: Number,
  },
  data() {
    return { viewBox: "0 -50 200 600" };
  },
  methods: {
    checkIcon(A) {
      return this.icon == A;
    },
    changeViewbox() {
      switch (this.icon) {
        case "success": {
          this.viewBox = "0 0 512 512";
          break;
        }
        case "close": {
          this.viewBox = "-89 0 500 500";
          break;
        }
        case "error": {
          this.viewBox = "-89 0 500 500";
          break;
        }
        case "info": {
          this.viewBox = "0 -50 180 600";
          break;
        }
        case "warning": {
          this.viewBox = "0 -30 192 580";
          break;
        }
      }
    },
  },
  created() {
    this.changeViewbox();
  },
  watch: {
    icon() {
      this.changeViewbox();
    },
  },
});
const mu = ["viewBox"],
  Iu = ["stroke", "fill", "stroke-width"],
  yu = ["stroke", "fill", "stroke-width"],
  bu = ["stroke", "fill", "stroke-width"],
  Ku = ["stroke", "fill", "stroke-width"],
  xu = ["stroke", "fill", "stroke-width"];
function Lu(A, e, t, r, n, s) {
  return (
    Ae(),
    le(
      "svg",
      {
        style: Ze(
          "height: " +
            A.iconSize * 0.6 +
            "px; width: " +
            (A.iconSize * 0.6 + 2) +
            "px;"
        ),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: A.viewBox,
        class: "icon-svg",
      },
      [
        A.checkIcon("success")
          ? (Ae(),
            le(
              "path",
              {
                key: 0,
                stroke: A.iconColor,
                fill: A.iconType == "regular" ? "transparent" : A.iconColor,
                "stroke-width": A.iconType == "regular" ? "40px" : "0",
                "stroke-alignment": "inside",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "",
                d: "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z",
              },
              null,
              8,
              Iu
            ))
          : at("", !0),
        A.checkIcon("info")
          ? (Ae(),
            le(
              "path",
              {
                key: 1,
                stroke: A.iconColor,
                fill: A.iconType == "regular" ? "transparent" : A.iconColor,
                "stroke-width": A.iconType == "regular" ? "50px" : "0",
                "stroke-alignment": "centre",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                class: "",
                d: "M20 424.229h20V279.771H20c-11.046 0-20-8.954-20-20V212c0-11.046 8.954-20 20-20h112c11.046 0 20 8.954 20 20v212.229h20c11.046 0 20 8.954 20 20V492c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20v-47.771c0-11.046 8.954-20 20-20zM96 0C56.235 0 24 32.235 24 72s32.235 72 72 72 72-32.235 72-72S135.764 0 96 0z",
              },
              null,
              8,
              yu
            ))
          : at("", !0),
        A.checkIcon("error")
          ? (Ae(),
            le(
              "path",
              {
                key: 2,
                stroke: A.iconColor,
                fill: A.iconType == "regular" ? "transparent" : A.iconColor,
                "stroke-width": A.iconType == "regular" ? "30px" : "0",
                "stroke-alignment": "centre",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z",
              },
              null,
              8,
              bu
            ))
          : at("", !0),
        A.checkIcon("close")
          ? (Ae(),
            le(
              "path",
              {
                key: 3,
                stroke: A.iconColor,
                fill: A.iconColor,
                "stroke-width": A.iconType == "regular" ? "30px" : "0",
                "stroke-alignment": "outside",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z",
              },
              null,
              8,
              Ku
            ))
          : at("", !0),
        A.checkIcon("warning")
          ? (Ae(),
            le(
              "path",
              {
                key: 4,
                stroke: A.iconColor,
                fill: A.iconType == "regular" ? "transparent" : A.iconColor,
                "stroke-width": A.iconType == "regular" ? "50px" : "0",
                "stroke-alignment": "centre",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
                d: "M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80 35.888-80 80-80 80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z",
              },
              null,
              8,
              xu
            ))
          : at("", !0),
      ],
      12,
      mu
    )
  );
}
ka.render = Lu;
var Pa = va({
  name: "VueBasicAlert",
  props: {
    width: { type: Number },
    duration: { type: Number, default: 300 },
    closeIn: { type: Number, default: null },
  },
  components: { Icon: ka },
  data() {
    return {
      position: "top right",
      status: !1,
      isHide: !1,
      iconSize: 35,
      iconType: "solid",
      alertType: "info",
      header: "Some Information",
      message: "This is the information of something you may know",
    };
  },
  methods: {
    showAlert(A, e, t, r) {
      (this.alertType = A),
        (this.header = t || A.toUpperCase()),
        (this.message = e),
        r
          ? ((this.position = r.position ? r.position : "top right"),
            (this.iconSize = r.iconSize ? r.iconSize : 35),
            (this.iconType = r.iconType === "regular" ? "regular" : "solid"))
          : (this.iconType = "solid"),
        setTimeout(() => {
          this.status = !0;
        }, 50),
        this.closeIn && setTimeout(() => this.closeAlert(), this.closeIn);
    },
    closeAlert() {
      (this.isHide = !0),
        setTimeout(() => {
          (this.isHide = !1),
            (this.status = !1),
            (this.iconSize = 40),
            (this.header = ""),
            (this.message = "");
        }, this.duration);
    },
  },
});
const Tu = { class: "alert-container" },
  Du = { class: "alert-icon" },
  Su = { class: "alert-content" },
  Ou = { class: "alert-head" },
  _u = { class: "alert-message" },
  Mu = { class: "alert-close" };
function Ru(A, e, t, r, n, s) {
  const i = us("Icon");
  return (
    Ae(),
    le(
      "div",
      {
        class: gt([
          "vue-alert",
          A.status
            ? `${A.position ? A.position : "top right"} ${
                A.isHide ? "" : "active"
              }`
            : `${A.position ? A.position : "top right"}`,
        ]),
        style: Ze(
          `width: ${A.width ? A.width : 400}px;transition: all ${
            A.status ? A.duration : 0
          }ms ease-in-out;`
        ),
      },
      [
        g("div", Tu, [
          g("div", { class: gt(["alert-color-bar", A.alertType]) }, null, 2),
          g("div", Du, [
            g(
              "div",
              {
                class: gt(["alert-icon-box", A.alertType]),
                style: Ze(
                  "width: " + A.iconSize + "px; height: " + A.iconSize + "px;"
                ),
              },
              [
                GA(
                  i,
                  {
                    icon: A.alertType,
                    iconSize: A.iconSize,
                    iconType: A.iconType,
                  },
                  null,
                  8,
                  ["icon", "iconSize", "iconType"]
                ),
              ],
              6
            ),
          ]),
          g("div", Su, [
            g("h5", Ou, ut(A.header), 1),
            g("p", _u, ut(A.message), 1),
          ]),
          g("div", Mu, [
            g(
              "div",
              {
                onClick:
                  e[0] ||
                  (e[0] = function () {
                    return A.closeAlert && A.closeAlert(...arguments);
                  }),
                class: "alert-close-button",
                style: Ze(
                  "width: " +
                    A.iconSize * 0.6 +
                    "px; height: " +
                    A.iconSize * 0.6 +
                    `px;transition: all ${A.duration}ms ease-in-out;`
                ),
              },
              [
                GA(i, {
                  icon: "close",
                  style: { width: "100%" },
                  iconColor: "#bbbbbb",
                }),
              ],
              4
            ),
          ]),
        ]),
      ],
      6
    )
  );
}
function Gu(A, e) {
  e === void 0 && (e = {});
  var t = e.insertAt;
  if (!(!A || typeof document > "u")) {
    var r = document.head || document.getElementsByTagName("head")[0],
      n = document.createElement("style");
    (n.type = "text/css"),
      t === "top" && r.firstChild
        ? r.insertBefore(n, r.firstChild)
        : r.appendChild(n),
      n.styleSheet
        ? (n.styleSheet.cssText = A)
        : n.appendChild(document.createTextNode(A));
  }
}
var Vu = `
:root {
  --success-green: #2aa36a;
  --info-blue: #2a79c2;
  --error-red: #eb4e2c;
  --warning-yellow: #ffc600;
}
.vue-alert * {
  font-family: Arial;
}
.vue-alert {
  position: fixed;
  display: block;
  margin: 0px;
  border: none;
  border-radius: 6px;
  opacity: 0;
  background: #fff;
  box-shadow: 0px 0px 16px 0px #d3d3d3;
  text-align: center;
  z-index: 1000000;
  padding: 10px;
}
.vue-alert.top {
  top: 20px;
}
.vue-alert.bottom {
  bottom: 20px;
}
.vue-alert.center {
  right: 50%;
}
.vue-alert.top.center {
  transform: translate(50%, -100%);
  max-width: calc(100vw - 60px);
}
.vue-alert.bottom.center {
  transform: translate(50%, 100%);
  max-width: calc(100vw - 60px);
}
.vue-alert.right {
  transform: translate(100%, 0px);
  max-width: calc(100vw - 60px);
  right: 20px;
}
.vue-alert.left {
  transform: translate(-100%, 0px);
  max-width: calc(100vw - 60px);
  left: 20px;
}
.vue-alert.active {
  opacity: 1;
  transform: translate(0px, 0px);
}
.vue-alert.center.active {
  opacity: 1;
  transform: translate(50%, 0%);
}
.vue-alert > .alert-container {
  display: flex;
  position: relative;
  width: 100%;
}
.vue-alert > .alert-container .alert-color-bar {
  min-height: 65px;
  height: auto;
  min-width: 5px;
  border-radius: 2px;
  margin-right: 10px;
}
.vue-alert > .alert-container .alert-icon {
  display: flex;
  margin: auto 16px auto 6px;
}
.vue-alert > .alert-container .alert-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin: auto;
}
.vue-alert > .alert-container .alert-content {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
}
.vue-alert > .alert-container .alert-icon-box.success,
.vue-alert > .alert-container .alert-color-bar.success {
  background-color: var(--success-green);
}
.vue-alert > .alert-container .alert-icon-box.info,
.vue-alert > .alert-container .alert-color-bar.info {
  background-color: var(--info-blue);
}
.vue-alert > .alert-container .alert-icon-box.error,
.vue-alert > .alert-container .alert-color-bar.error {
  background-color: var(--error-red);
}
.vue-alert > .alert-container .alert-icon-box.warning,
.vue-alert > .alert-container .alert-color-bar.warning {
  background-color: var(--warning-yellow);
}
.vue-alert > .alert-container .alert-close {
  display: flex;
  margin: 0px 6px;
}
.vue-alert > .alert-container .alert-close-button {
  padding: 6px;
  margin: auto;
  border-radius: 18%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vue-alert > .alert-container .alert-close-button:hover {
  background-color: #ffffff;
  filter: drop-shadow(0px 1px 3px gainsboro) brightness(0.95);
}
.vue-alert > .alert-container .alert-content > * {
  text-align: left;
  margin: 2px 4px;
  padding-right: 6px;
}
.vue-alert > .alert-container .alert-content > h5.alert-head {
  font-size: 16px;
  font-weight: 600;
  color: #4b4b4b;
}
.vue-alert > .alert-container .alert-content > p.alert-message {
  font-size: 14px;
  min-width: fit-content;
  font-weight: bold;
  line-height: 1.3;
  color: #bcbcbc;
}
`;
Gu(Vu);
Pa.render = Ru;
var Nu = (() => {
  const A = Pa;
  return (
    (A.install = (e) => {
      e.component("VueBasicAlert", A);
    }),
    A
  );
})();
const ku = "https://i.imgur.com/lQDcvmd.png",
  Xa = (A, e) => {
    const t = A.__vccOpts || A;
    for (const [r, n] of e) t[r] = n;
    return t;
  },
  Pu = {
    mounted() {
      const A = document.getElementById("range"),
        e = document.getElementById("range2");
      A.addEventListener("input", function () {
        var t = this.value / 100,
          r = 1 + t,
          n = document.createElement("style");
        (n.innerHTML =
          "#filter:before {background: linear-gradient(to top, rgba(255,255,255,1.0) " +
          t * 100 +
          "%, rgba(255,255,255,0) " +
          r * 40 +
          "%);}"),
          document.getElementById("filter").appendChild(n);
      }),
        e.addEventListener("input", function () {
          var t = this.value / 100,
            r = 1 - t,
            n = document.createElement("style");
          (n.innerHTML = "#filter:after { top:" + r * 430 + "px;}"),
            document.getElementById("filter").appendChild(n);
        });
    },
  },
  Xu = g(
    "div",
    { id: "render", class: "col-lg-3 col-md-12 pb-3" },
    [
      g("div", { id: "filter" }, [
        g("img", { id: "previewImg", src: ku, alt: "Placeholder" }),
      ]),
    ],
    -1
  ),
  Ju = g(
    "div",
    {
      class:
        "col-lg-4 col-md-12 ml-5 align-self-center text-center m-5 animate__animated animate__fadeIn",
    },
    [
      g("h3", null, "Dostosuj gradient"),
      g("div", { class: "mt-4" }, [
        g("input", {
          type: "range",
          min: "15",
          max: "40",
          value: "0",
          class: "slider",
          id: "range",
        }),
        g("p", null, "Ustawienie gradientu"),
      ]),
      g("div", { class: "mt-4" }, [
        g("input", {
          type: "range",
          min: "2",
          max: "30",
          value: "0",
          class: "slider2",
          id: "range2",
        }),
        g("p", null, "Ustawienie logo"),
      ]),
      g("p", null, [
        g("input", {
          type: "file",
          name: "photo",
          onchange: "previewFile(this);",
          required: "",
        }),
      ]),
      g("p", null, [
        g(
          "button",
          {
            class: "btn btn-block btn-custom btn-lg mt-2 mb-3",
            id: "btnDownload",
          },
          [
            g("i", { class: "fa-solid fa-download fa-fw" }),
            qt("Pobierz zdjęcie "),
          ]
        ),
      ]),
    ],
    -1
  );
function Wu(A, e, t, r, n, s) {
  return Ae(), le(PA, null, [Xu, Ju], 64);
}
const Yu = Xa(Pu, [["render", Wu]]),
  Zu = {
    data() {
      return {
        name: "",
        surname: "",
        position: "",
        phone_number: "",
        email: "",
        imgSrc: "",
        text: "Tutaj wygenerowana zostanie stopka...",
      };
    },
    components: { VueBasicAlert: Nu, photoEdit: Yu },
    methods: {
      onFile(A) {
        const e = A.target.files;
        if (!e.length) return;
        const t = new FileReader();
        t.readAsDataURL(e[0]), (t.onload = () => (this.imgSrc = t.result));
      },
      m1: function () {
        this.$refs.myinput.focus(), document.execCommand("copy");
      },
      m2: function () {
        this.$refs.alert.showAlert(
          "success",
          "Udało się skopiować kod",
          "Skopiowano!"
        );
      },
    },
    mounted() {
      document.addEventListener("DOMContentLoaded", () => {
        const A = document.getElementById("button1"),
          e = document.getElementById("preview"),
          t = document.getElementById("code-text");
        A.addEventListener("click", () => {
          t.value = e.innerHTML;
        });
      });
    },
  },
  ju = { class: "container pb-3 pt-3" },
  zu = g("hr", { class: "hrcenter pb-3" }, null, -1),
  qu = g(
    "h2",
    { class: "text-center pb-4" },
    "Generator zdjęcia profilowego",
    -1
  ),
  $u = { class: "pb-5", ref: "printcontent" },
  Af = { class: "row justify-content-center" },
  ef = { class: "container-fluid" },
  tf = g("hr", { class: "hrcenter pb-3 mt-5" }, null, -1),
  rf = g("h2", { class: "text-center mb-4" }, "Generator stopki HTML", -1),
  nf = { class: "row ct-1" },
  sf = { class: "col-lg-8 col-sm-12 p-3 border rounded bg-white" },
  of = { id: "preview" },
  af = g("p", null, "Best regards / Pozdrawiam", -1),
  Bf = {
    class: "sc-gPEVay eQYmiW",
    style: {
      "vertical-align": "-webkit-baseline-middle",
      "font-family": "Arial",
    },
    cellspacing: "0",
    cellpadding: "0",
  },
  lf = {
    class: "sc-gPEVay eQYmiW",
    style: {
      "vertical-align": "-webkit-baseline-middle",
      "font-family": "Arial",
    },
    cellspacing: "0",
    cellpadding: "0",
  },
  cf = { style: { "vertical-align": "top", width: "170px" } },
  uf = {
    class: "sc-gPEVay eQYmiW",
    style: {
      "vertical-align": "-webkit-baseline-middle",
      "font-family": "Arial",
      height: "85px",
    },
    cellspacing: "0",
    cellpadding: "0",
  },
  ff = {
    class: "sc-TOsTZ kjYrri",
    style: { "text-align": "center", width: "171px" },
  },
  gf = ["src"],
  wf = g(
    "tr",
    { style: { height: "30px" } },
    [
      g(
        "td",
        { height: "30", style: { height: "30px", width: "171px" } },
        "   "
      ),
    ],
    -1
  ),
  Qf = g(
    "tr",
    { style: { height: "32px" } },
    [
      g(
        "td",
        { style: { "text-align": "center", height: "32px", width: "171px" } },
        [
          g(
            "table",
            {
              class: "sc-gPEVay eQYmiW",
              style: {
                "vertical-align": "-webkit-baseline-middle",
                "font-family": "Arial",
                display: "inline-block",
              },
              cellspacing: "0",
              cellpadding: "0",
            },
            [
              g("tbody", null, [
                g("tr", { style: { "text-align": "center" } }, [
                  g("td", null, [
                    g(
                      "a",
                      {
                        class: "sc-hzDkRC kpsoyz",
                        style: {
                          display: "inline-block",
                          padding: "0px",
                          "background-color": "#224f89",
                        },
                        href: "https://www.facebook.com/codema.io",
                      },
                      [
                        g("img", {
                          class: "sc-bRBYWo ccSRck",
                          style: {
                            "background-color": "#224f89",
                            "max-width": "135px",
                            display: "block",
                          },
                          src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/facebook-icon-2x.png",
                          alt: "facebook",
                          height: "24",
                        }),
                      ]
                    ),
                  ]),
                  g("td", { width: "5" }, [g("div", null, " ")]),
                  g("td", null, [
                    g(
                      "a",
                      {
                        class: "sc-hzDkRC kpsoyz",
                        style: {
                          display: "inline-block",
                          padding: "0px",
                          "background-color": "#224f89",
                        },
                        href: "https://www.linkedin.com/company/codema-software-house",
                      },
                      [
                        g("img", {
                          class: "sc-bRBYWo ccSRck",
                          style: {
                            "background-color": "#224f89",
                            "max-width": "135px",
                            display: "block",
                          },
                          src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/linkedin-icon-2x.png",
                          alt: "linkedin",
                          height: "24",
                        }),
                      ]
                    ),
                  ]),
                  g("td", { width: "5" }, [g("div", null, " ")]),
                  g("td", null, [
                    g(
                      "a",
                      {
                        class: "sc-hzDkRC kpsoyz",
                        style: {
                          display: "inline-block",
                          padding: "0px",
                          "background-color": "#224f89",
                        },
                        href: "https://www.instagram.com/codemasoftwarehouse/",
                      },
                      [
                        g("img", {
                          class: "sc-bRBYWo ccSRck",
                          style: {
                            "background-color": "#224f89",
                            "max-width": "135px",
                            display: "block",
                          },
                          src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/instagram-icon-2x.png",
                          alt: "instagram",
                          height: "24",
                        }),
                      ]
                    ),
                  ]),
                  g("td", { width: "5" }, [g("div", null, " ")]),
                ]),
              ]),
            ]
          ),
        ]
      ),
    ],
    -1
  ),
  hf = g("td", { style: { width: "28px" } }, [g("div", null, " ")], -1),
  df = {
    style: { padding: "0px", "vertical-align": "middle", width: "365px" },
  },
  Cf = {
    class: "sc-fBuWsC eeihxG",
    style: {
      margin: "0px",
      "font-size": "18px",
      "font-weight": "bold",
      color: "#000000",
    },
  },
  Uf = {
    class: "sc-fMiknA bxZCMx",
    style: {
      margin: "0px",
      color: "#000000",
      "font-size": "14px",
      "line-height": "22px",
    },
  },
  Ff = g(
    "p",
    {
      class: "sc-dVhcbM fghLuF",
      style: {
        margin: "0px",
        "font-weight": "500",
        color: "#000000",
        "font-size": "14px",
        "line-height": "22px",
      },
    },
    " CODEMA Software House ",
    -1
  ),
  pf = g(
    "p",
    {
      class: "sc-eqIVtm kRufpp",
      style: {
        color: "#000000",
        margin: "0px",
        "font-size": "14px",
        "line-height": "22px",
      },
    },
    " PHP, Python, Java, React.js, Vue.js, React Native ",
    -1
  ),
  Ef = g(
    "table",
    {
      class: "sc-gPEVay eQYmiW",
      style: {
        "vertical-align": "-webkit-baseline-middle",
        "font-family": "Arial",
        width: "100%",
      },
      cellspacing: "0",
      cellpadding: "0",
    },
    [
      g("tbody", null, [
        g("tr", null, [
          g(
            "td",
            {
              class: "sc-jhAzac hmXDXQ",
              style: {
                width: "100%",
                "border-bottom": "1px solid #224f89",
                "border-left": "none",
                display: "block",
              },
              height: "1",
            },
            "   "
          ),
        ]),
      ]),
    ],
    -1
  ),
  Hf = {
    class: "sc-gPEVay eQYmiW",
    style: {
      "vertical-align": "-webkit-baseline-middle",
      "font-family": "Arial",
      height: "72px",
    },
    cellspacing: "0",
    cellpadding: "0",
  },
  vf = { style: { "vertical-align": "middle" } },
  mf = g(
    "td",
    { style: { "vertical-align": "middle", height: "18px", width: "30px" } },
    [
      g(
        "table",
        {
          class: "sc-gPEVay eQYmiW",
          style: {
            "vertical-align": "-webkit-baseline-middle",
            "font-family": "Arial",
          },
          cellspacing: "0",
          cellpadding: "0",
        },
        [
          g("tbody", null, [
            g("tr", null, [
              g("td", { style: { "vertical-align": "bottom" } }, [
                g(
                  "span",
                  {
                    class: "sc-jlyJG bbyJzT",
                    style: { display: "block", "background-color": "#224f89" },
                  },
                  [
                    g("img", {
                      class: "sc-iRbamj blSEcj",
                      style: {
                        display: "block",
                        "background-color": "#224f89",
                      },
                      src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/phone-icon-2x.png",
                      width: "13",
                    }),
                  ]
                ),
              ]),
            ]),
          ]),
        ]
      ),
    ],
    -1
  ),
  If = {
    style: {
      padding: "0px",
      color: "#000000",
      height: "18px",
      width: "303.094px",
    },
  },
  yf = {
    class: "sc-gipzik iyhjGb",
    style: { "text-decoration": "none", color: "#000000", "font-size": "12px" },
    href: "tel:+48 numer telefonu",
  },
  bf = { style: { "vertical-align": "middle" } },
  Kf = g(
    "td",
    { style: { "vertical-align": "middle", height: "18px", width: "30px" } },
    [
      g(
        "table",
        {
          class: "sc-gPEVay eQYmiW",
          style: {
            "vertical-align": "-webkit-baseline-middle",
            "font-family": "Arial",
          },
          cellspacing: "0",
          cellpadding: "0",
        },
        [
          g("tbody", null, [
            g("tr", null, [
              g("td", { style: { "vertical-align": "bottom" } }, [
                g(
                  "span",
                  {
                    class: "sc-jlyJG bbyJzT",
                    style: { display: "block", "background-color": "#224f89" },
                  },
                  [
                    g("img", {
                      class: "sc-iRbamj blSEcj",
                      style: {
                        display: "block",
                        "background-color": "#224f89",
                      },
                      src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/email-icon-2x.png",
                      width: "13",
                    }),
                  ]
                ),
              ]),
            ]),
          ]),
        ]
      ),
    ],
    -1
  ),
  xf = {
    style: {
      padding: "0px",
      height: "18px",
      width: "303.094px",
      "font-size": "12px",
    },
  },
  Lf = g(
    "tr",
    { style: { "vertical-align": "middle" } },
    [
      g(
        "td",
        {
          style: { "vertical-align": "middle", height: "18px", width: "30px" },
        },
        [
          g(
            "table",
            {
              class: "sc-gPEVay eQYmiW",
              style: {
                "vertical-align": "-webkit-baseline-middle",
                "font-family": "Arial",
              },
              cellspacing: "0",
              cellpadding: "0",
            },
            [
              g("tbody", null, [
                g("tr", null, [
                  g("td", { style: { "vertical-align": "bottom" } }, [
                    g(
                      "span",
                      {
                        class: "sc-jlyJG bbyJzT",
                        style: {
                          display: "block",
                          "background-color": "#224f89",
                        },
                      },
                      [
                        g("img", {
                          class: "sc-iRbamj blSEcj",
                          style: {
                            display: "block",
                            "background-color": "#224f89",
                          },
                          src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/link-icon-2x.png",
                          width: "13",
                        }),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ]
          ),
        ]
      ),
      g(
        "td",
        { style: { padding: "0px", height: "18px", width: "303.094px" } },
        [
          g(
            "a",
            {
              class: "sc-gipzik iyhjGb",
              style: {
                "text-decoration": "none",
                color: "#000000",
                "font-size": "12px",
              },
              href: "https://codema.io",
            },
            "https://codema.io"
          ),
        ]
      ),
    ],
    -1
  ),
  Tf = g(
    "tr",
    { style: { "vertical-align": "middle" } },
    [
      g(
        "td",
        {
          style: { "vertical-align": "middle", height: "18px", width: "30px" },
        },
        [
          g(
            "table",
            {
              class: "sc-gPEVay eQYmiW",
              style: {
                "vertical-align": "-webkit-baseline-middle",
                "font-family": "Arial",
              },
              cellspacing: "0",
              cellpadding: "0",
            },
            [
              g("tbody", null, [
                g("tr", null, [
                  g("td", { style: { "vertical-align": "bottom" } }, [
                    g(
                      "a",
                      {
                        title: "CODEMA - location",
                        href: "https://g.page/codema-software?share",
                        target: "_blank",
                        rel: "noopener",
                      },
                      [
                        g(
                          "span",
                          {
                            class: "sc-jlyJG bbyJzT",
                            style: {
                              display: "block",
                              "background-color": "#224f89",
                            },
                          },
                          [
                            g("img", {
                              class: "sc-iRbamj blSEcj",
                              style: {
                                display: "block",
                                "background-color": "#224f89",
                              },
                              src: "https://cdn2.hubspot.net/hubfs/53/tools/email-signature-generator/icons/address-icon-2x.png",
                              width: "13",
                            }),
                          ]
                        ),
                      ]
                    ),
                  ]),
                ]),
              ]),
            ]
          ),
        ]
      ),
      g(
        "td",
        { style: { padding: "0px", height: "18px", width: "303.094px" } },
        [
          g(
            "span",
            {
              class: "sc-csuQGl CQhxV",
              style: { "font-size": "12px", color: "#000000" },
            },
            "ul. Anny Walentynowicz 10, 20-328 Lublin, Poland"
          ),
        ]
      ),
    ],
    -1
  ),
  Df = g("br", null, null, -1),
  Sf = g(
    "table",
    {
      class: "sc-gPEVay eQYmiW",
      style: {
        "vertical-align": "-webkit-baseline-middle",
        "font-family": "Arial",
        width: "341px",
        height: "89px",
      },
      cellspacing: "0",
      cellpadding: "0",
    },
    [
      g("tbody", null, [
        g("tr", null, [
          g("td", { style: { width: "337px" }, height: "30" }, [
            g("span", { style: { display: "block", "text-align": "left" } }, [
              g(
                "a",
                {
                  class: "sc-fAjcbJ byigni",
                  style: {
                    "border-width": "6px 12px",
                    "border-style": "solid",
                    "border-color": "#224f89",
                    display: "inline-block",
                    "background-color": "#224f89",
                    color: "#ffffff",
                    "font-weight": "bold",
                    "text-decoration": "none",
                    "text-align": "center",
                    "line-height": "40px",
                    "font-size": "12px",
                    "border-radius": "3px",
                  },
                  href: "https://codema.io/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
                "Visit our website"
              ),
            ]),
            g("br"),
            g("img", {
              src: "https://static.codema.pl/files/nagroda_codema_350x1024.jpeg",
              alt: "",
              width: "361",
            }),
          ]),
        ]),
      ]),
    ],
    -1
  ),
  Of = g("br", null, null, -1),
  _f = g(
    "span",
    { style: { display: "block", "text-align": "left" } },
    [
      g(
        "span",
        { style: { color: "#808080", "font-size": "9px" } },
        "The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future. Thank You in advance."
      ),
      g("br"),
    ],
    -1
  ),
  Mf = g(
    "tr",
    null,
    [
      g("td", { style: { "vertical-align": "top", width: "134px" } }),
      g("td", { style: { width: "28px" } }, [g("div")]),
      g(
        "td",
        {
          style: { padding: "0px", "vertical-align": "middle", width: "365px" },
        },
        [
          g("h3", {
            class: "sc-fBuWsC eeihxG",
            style: { margin: "0px", "font-size": "18px", color: "#000000" },
          }),
        ]
      ),
    ],
    -1
  ),
  Rf = {
    class:
      "col-lg-4 col-sm-12 heading-type-1 animate__animated animate__fadeIn form-container",
  },
  Gf = g("div", { class: "logo mt-2" }, null, -1),
  Vf = g("h3", null, "Uzupełnij dane", -1),
  Nf = { class: "pt-4" },
  kf = { class: "group" },
  Pf = g("span", { class: "highlight" }, null, -1),
  Xf = g("span", { class: "bar" }, null, -1),
  Jf = g("label", null, "Imię i nazwisko", -1),
  Wf = { class: "group" },
  Yf = g("span", { class: "highlight" }, null, -1),
  Zf = g("span", { class: "bar" }, null, -1),
  jf = g("label", null, "Stanowisko", -1),
  zf = { class: "group" },
  qf = g("span", { class: "highlight" }, null, -1),
  $f = g("span", { class: "bar" }, null, -1),
  Ag = g("label", null, "Numer telefonu", -1),
  eg = { class: "group" },
  tg = g("span", { class: "highlight" }, null, -1),
  rg = g("span", { class: "bar" }, null, -1),
  ng = g("label", null, "Adres e-mail", -1),
  sg = { class: "group mt-5" },
  ig = g("span", { class: "highlight" }, null, -1),
  og = g("span", { class: "bar" }, null, -1),
  ag = g("label", null, "Link do zdjęcia", -1),
  Bg = g(
    "button",
    {
      id: "button1",
      class: "btn btn-custom float-end px-5 btn-lg",
      type: "button",
    },
    [
      g("i", { class: "fa fa-refresh fa-fw", "aria-hidden": "true" }),
      qt("Generuj kod "),
    ],
    -1
  ),
  lg = g("div", null, null, -1),
  cg = { class: "container textarea-container" },
  ug = { class: "pt-3" },
  fg = { class: "col-md-12" },
  gg = { action: "" },
  wg = { class: "form-group" },
  Qg = ["value"],
  hg = { class: "col-md-12" },
  dg = { class: "input-group-btn" },
  Cg = g("i", { class: "fa fa-clone fa-fw", "aria-hidden": "true" }, null, -1);
function Ug(A, e, t, r, n, s) {
  const i = us("photoEdit"),
    o = us("vue-basic-alert");
  return (
    Ae(),
    le(
      PA,
      null,
      [
        g("div", ju, [
          zu,
          qu,
          g("div", $u, [g("div", Af, [GA(i)])], 512),
          g("div", ef, [
            tf,
            rf,
            g("div", nf, [
              g("div", sf, [
                g("div", of, [
                  af,
                  g("table", Bf, [
                    g("tbody", null, [
                      g("tr", null, [
                        g("td", null, [
                          g("table", lf, [
                            g("tbody", null, [
                              g("tr", null, [
                                g("td", cf, [
                                  g("table", uf, [
                                    g("tbody", null, [
                                      g("tr", null, [
                                        g("td", ff, [
                                          n.imgSrc
                                            ? (Ae(),
                                              le(
                                                "img",
                                                {
                                                  key: 0,
                                                  src: n.imgSrc,
                                                  id: "profile_picture",
                                                  class: "sc-cHGsZl bHiaRe",
                                                  style: {
                                                    background:
                                                      "linear-gradient(90deg, rgba(255,255,255,1) 13%, rgba(0,0,0,0) 100%)",
                                                    "max-width": "170px",
                                                    display: "block",
                                                  },
                                                  role: "presentation",
                                                  width: "170",
                                                },
                                                null,
                                                8,
                                                gf
                                              ))
                                            : at("", !0),
                                        ]),
                                      ]),
                                      wf,
                                      Qf,
                                    ]),
                                  ]),
                                ]),
                                hf,
                                g("td", df, [
                                  g("h3", Cf, ut(n.name), 1),
                                  g("p", Uf, ut(n.position), 1),
                                  Ff,
                                  pf,
                                  Ef,
                                  g("table", Hf, [
                                    g("tbody", null, [
                                      g("tr", vf, [
                                        mf,
                                        g("td", If, [
                                          g("a", yf, [
                                            qt("+48 "),
                                            g(
                                              "span",
                                              null,
                                              ut(n.phone_number),
                                              1
                                            ),
                                          ]),
                                        ]),
                                      ]),
                                      g("tr", bf, [
                                        Kf,
                                        g("td", xf, ut(n.email), 1),
                                      ]),
                                      Lf,
                                      Tf,
                                    ]),
                                  ]),
                                  Df,
                                  Sf,
                                  Of,
                                  _f,
                                ]),
                              ]),
                              Mf,
                            ]),
                          ]),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              g("div", Rf, [
                Gf,
                Vf,
                g("form", Nf, [
                  g("div", kf, [
                    It(
                      g(
                        "input",
                        {
                          type: "text",
                          id: "name",
                          "onUpdate:modelValue":
                            e[0] || (e[0] = (a) => (n.name = a)),
                          required: "",
                        },
                        null,
                        512
                      ),
                      [[yt, n.name]]
                    ),
                    Pf,
                    Xf,
                    Jf,
                  ]),
                  g("div", Wf, [
                    It(
                      g(
                        "input",
                        {
                          type: "text",
                          id: "name",
                          "onUpdate:modelValue":
                            e[1] || (e[1] = (a) => (n.position = a)),
                          required: "",
                        },
                        null,
                        512
                      ),
                      [[yt, n.position]]
                    ),
                    Yf,
                    Zf,
                    jf,
                  ]),
                  g("div", zf, [
                    It(
                      g(
                        "input",
                        {
                          type: "phone",
                          id: "name",
                          "onUpdate:modelValue":
                            e[2] || (e[2] = (a) => (n.phone_number = a)),
                          required: "",
                        },
                        null,
                        512
                      ),
                      [[yt, n.phone_number]]
                    ),
                    qf,
                    $f,
                    Ag,
                  ]),
                  g("div", eg, [
                    It(
                      g(
                        "input",
                        {
                          type: "text",
                          id: "name",
                          "onUpdate:modelValue":
                            e[3] || (e[3] = (a) => (n.email = a)),
                          required: "",
                        },
                        null,
                        512
                      ),
                      [[yt, n.email]]
                    ),
                    tg,
                    rg,
                    ng,
                  ]),
                  g("div", sg, [
                    It(
                      g(
                        "input",
                        {
                          type: "text",
                          id: "name",
                          "onUpdate:modelValue":
                            e[4] || (e[4] = (a) => (n.imgSrc = a)),
                          onChange:
                            e[5] ||
                            (e[5] = (...a) => s.onFile && s.onFile(...a)),
                        },
                        null,
                        544
                      ),
                      [[yt, n.imgSrc]]
                    ),
                    ig,
                    og,
                    ag,
                  ]),
                ]),
                Bg,
              ]),
            ]),
            lg,
          ]),
        ]),
        g("div", cg, [
          g("div", ug, [
            g("div", fg, [
              g("form", gg, [
                g("div", wg, [
                  g(
                    "textarea",
                    {
                      onFocus: e[6] || (e[6] = (a) => a.target.select()),
                      ref: "myinput",
                      readonly: "",
                      value: n.text,
                      type: "text",
                      class: "form-control",
                      placeholder: "kod html",
                      id: "code-text",
                      rows: "4",
                      cols: "10",
                    },
                    null,
                    40,
                    Qg
                  ),
                ]),
              ]),
            ]),
          ]),
          g("div", hg, [
            g("span", dg, [
              g(
                "button",
                {
                  onClick:
                    e[7] ||
                    (e[7] = (a) => {
                      s.m1(), s.m2();
                    }),
                  class:
                    "btn btn-outline-secondary pt-2 mt-2 float-end px-5 mb-3",
                  type: "button",
                  id: "copy-button",
                  "data-placement": "button",
                  title: "Skopiuj do schowka",
                },
                [Cg, qt(" Kopiuj ")]
              ),
              GA(o, { duration: 400, closeIn: 1500, ref: "alert" }, null, 512),
            ]),
          ]),
        ]),
      ],
      64
    )
  );
}
const Fg = Xa(Zu, [["render", Ug]]);
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */ /*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ var Cs =
  function (A, e) {
    return (
      (Cs =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (t, r) {
            t.__proto__ = r;
          }) ||
        function (t, r) {
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
        }),
      Cs(A, e)
    );
  };
function se(A, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError(
      "Class extends value " + String(e) + " is not a constructor or null"
    );
  Cs(A, e);
  function t() {
    this.constructor = A;
  }
  A.prototype =
    e === null ? Object.create(e) : ((t.prototype = e.prototype), new t());
}
var Us = function () {
  return (
    (Us =
      Object.assign ||
      function (e) {
        for (var t, r = 1, n = arguments.length; r < n; r++) {
          t = arguments[r];
          for (var s in t)
            Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
        }
        return e;
      }),
    Us.apply(this, arguments)
  );
};
function xA(A, e, t, r) {
  function n(s) {
    return s instanceof t
      ? s
      : new t(function (i) {
          i(s);
        });
  }
  return new (t || (t = Promise))(function (s, i) {
    function o(l) {
      try {
        B(r.next(l));
      } catch (c) {
        i(c);
      }
    }
    function a(l) {
      try {
        B(r.throw(l));
      } catch (c) {
        i(c);
      }
    }
    function B(l) {
      l.done ? s(l.value) : n(l.value).then(o, a);
    }
    B((r = r.apply(A, e || [])).next());
  });
}
function vA(A, e) {
  var t = {
      label: 0,
      sent: function () {
        if (s[0] & 1) throw s[1];
        return s[1];
      },
      trys: [],
      ops: [],
    },
    r,
    n,
    s,
    i;
  return (
    (i = { next: o(0), throw: o(1), return: o(2) }),
    typeof Symbol == "function" &&
      (i[Symbol.iterator] = function () {
        return this;
      }),
    i
  );
  function o(B) {
    return function (l) {
      return a([B, l]);
    };
  }
  function a(B) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (
          ((r = 1),
          n &&
            (s =
              B[0] & 2
                ? n.return
                : B[0]
                ? n.throw || ((s = n.return) && s.call(n), 0)
                : n.next) &&
            !(s = s.call(n, B[1])).done)
        )
          return s;
        switch (((n = 0), s && (B = [B[0] & 2, s.value]), B[0])) {
          case 0:
          case 1:
            s = B;
            break;
          case 4:
            return t.label++, { value: B[1], done: !1 };
          case 5:
            t.label++, (n = B[1]), (B = [0]);
            continue;
          case 7:
            (B = t.ops.pop()), t.trys.pop();
            continue;
          default:
            if (
              ((s = t.trys),
              !(s = s.length > 0 && s[s.length - 1]) &&
                (B[0] === 6 || B[0] === 2))
            ) {
              t = 0;
              continue;
            }
            if (B[0] === 3 && (!s || (B[1] > s[0] && B[1] < s[3]))) {
              t.label = B[1];
              break;
            }
            if (B[0] === 6 && t.label < s[1]) {
              (t.label = s[1]), (s = B);
              break;
            }
            if (s && t.label < s[2]) {
              (t.label = s[2]), t.ops.push(B);
              break;
            }
            s[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        B = e.call(A, t);
      } catch (l) {
        (B = [6, l]), (n = 0);
      } finally {
        r = s = 0;
      }
    if (B[0] & 5) throw B[1];
    return { value: B[0] ? B[1] : void 0, done: !0 };
  }
}
function cr(A, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, n = e.length, s; r < n; r++)
      (s || !(r in e)) &&
        (s || (s = Array.prototype.slice.call(e, 0, r)), (s[r] = e[r]));
  return A.concat(s || e);
}
var pe = (function () {
    function A(e, t, r, n) {
      (this.left = e), (this.top = t), (this.width = r), (this.height = n);
    }
    return (
      (A.prototype.add = function (e, t, r, n) {
        return new A(
          this.left + e,
          this.top + t,
          this.width + r,
          this.height + n
        );
      }),
      (A.fromClientRect = function (e, t) {
        return new A(
          t.left + e.windowBounds.left,
          t.top + e.windowBounds.top,
          t.width,
          t.height
        );
      }),
      (A.fromDOMRectList = function (e, t) {
        var r = Array.from(t).find(function (n) {
          return n.width !== 0;
        });
        return r
          ? new A(
              r.left + e.windowBounds.left,
              r.top + e.windowBounds.top,
              r.width,
              r.height
            )
          : A.EMPTY;
      }),
      (A.EMPTY = new A(0, 0, 0, 0)),
      A
    );
  })(),
  Qn = function (A, e) {
    return pe.fromClientRect(A, e.getBoundingClientRect());
  },
  pg = function (A) {
    var e = A.body,
      t = A.documentElement;
    if (!e || !t) throw new Error("Unable to get document size");
    var r = Math.max(
        Math.max(e.scrollWidth, t.scrollWidth),
        Math.max(e.offsetWidth, t.offsetWidth),
        Math.max(e.clientWidth, t.clientWidth)
      ),
      n = Math.max(
        Math.max(e.scrollHeight, t.scrollHeight),
        Math.max(e.offsetHeight, t.offsetHeight),
        Math.max(e.clientHeight, t.clientHeight)
      );
    return new pe(0, 0, r, n);
  },
  hn = function (A) {
    for (var e = [], t = 0, r = A.length; t < r; ) {
      var n = A.charCodeAt(t++);
      if (n >= 55296 && n <= 56319 && t < r) {
        var s = A.charCodeAt(t++);
        (s & 64512) === 56320
          ? e.push(((n & 1023) << 10) + (s & 1023) + 65536)
          : (e.push(n), t--);
      } else e.push(n);
    }
    return e;
  },
  fA = function () {
    for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
    var t = A.length;
    if (!t) return "";
    for (var r = [], n = -1, s = ""; ++n < t; ) {
      var i = A[n];
      i <= 65535
        ? r.push(i)
        : ((i -= 65536), r.push((i >> 10) + 55296, (i % 1024) + 56320)),
        (n + 1 === t || r.length > 16384) &&
          ((s += String.fromCharCode.apply(String, r)), (r.length = 0));
    }
    return s;
  },
  Yi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Eg = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var ur = 0; ur < Yi.length; ur++) Eg[Yi.charCodeAt(ur)] = ur;
var Zi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Dt = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var fr = 0; fr < Zi.length; fr++) Dt[Zi.charCodeAt(fr)] = fr;
var Hg = function (A) {
    var e = A.length * 0.75,
      t = A.length,
      r,
      n = 0,
      s,
      i,
      o,
      a;
    A[A.length - 1] === "=" && (e--, A[A.length - 2] === "=" && e--);
    var B =
        typeof ArrayBuffer < "u" &&
        typeof Uint8Array < "u" &&
        typeof Uint8Array.prototype.slice < "u"
          ? new ArrayBuffer(e)
          : new Array(e),
      l = Array.isArray(B) ? B : new Uint8Array(B);
    for (r = 0; r < t; r += 4)
      (s = Dt[A.charCodeAt(r)]),
        (i = Dt[A.charCodeAt(r + 1)]),
        (o = Dt[A.charCodeAt(r + 2)]),
        (a = Dt[A.charCodeAt(r + 3)]),
        (l[n++] = (s << 2) | (i >> 4)),
        (l[n++] = ((i & 15) << 4) | (o >> 2)),
        (l[n++] = ((o & 3) << 6) | (a & 63));
    return B;
  },
  vg = function (A) {
    for (var e = A.length, t = [], r = 0; r < e; r += 2)
      t.push((A[r + 1] << 8) | A[r]);
    return t;
  },
  mg = function (A) {
    for (var e = A.length, t = [], r = 0; r < e; r += 4)
      t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
    return t;
  },
  qe = 5,
  oi = 6 + 5,
  On = 2,
  Ig = oi - qe,
  Ja = 65536 >> qe,
  yg = 1 << qe,
  _n = yg - 1,
  bg = 1024 >> qe,
  Kg = Ja + bg,
  xg = Kg,
  Lg = 32,
  Tg = xg + Lg,
  Dg = 65536 >> oi,
  Sg = 1 << Ig,
  Og = Sg - 1,
  ji = function (A, e, t) {
    return A.slice
      ? A.slice(e, t)
      : new Uint16Array(Array.prototype.slice.call(A, e, t));
  },
  _g = function (A, e, t) {
    return A.slice
      ? A.slice(e, t)
      : new Uint32Array(Array.prototype.slice.call(A, e, t));
  },
  Mg = function (A, e) {
    var t = Hg(A),
      r = Array.isArray(t) ? mg(t) : new Uint32Array(t),
      n = Array.isArray(t) ? vg(t) : new Uint16Array(t),
      s = 24,
      i = ji(n, s / 2, r[4] / 2),
      o = r[5] === 2 ? ji(n, (s + r[4]) / 2) : _g(r, Math.ceil((s + r[4]) / 4));
    return new Rg(r[0], r[1], r[2], r[3], i, o);
  },
  Rg = (function () {
    function A(e, t, r, n, s, i) {
      (this.initialValue = e),
        (this.errorValue = t),
        (this.highStart = r),
        (this.highValueIndex = n),
        (this.index = s),
        (this.data = i);
    }
    return (
      (A.prototype.get = function (e) {
        var t;
        if (e >= 0) {
          if (e < 55296 || (e > 56319 && e <= 65535))
            return (
              (t = this.index[e >> qe]),
              (t = (t << On) + (e & _n)),
              this.data[t]
            );
          if (e <= 65535)
            return (
              (t = this.index[Ja + ((e - 55296) >> qe)]),
              (t = (t << On) + (e & _n)),
              this.data[t]
            );
          if (e < this.highStart)
            return (
              (t = Tg - Dg + (e >> oi)),
              (t = this.index[t]),
              (t += (e >> qe) & Og),
              (t = this.index[t]),
              (t = (t << On) + (e & _n)),
              this.data[t]
            );
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }),
      A
    );
  })(),
  zi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Gg = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var gr = 0; gr < zi.length; gr++) Gg[zi.charCodeAt(gr)] = gr;
var Vg =
    "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==",
  qi = 50,
  Ng = 1,
  Wa = 2,
  Ya = 3,
  kg = 4,
  Pg = 5,
  $i = 7,
  Za = 8,
  Ao = 9,
  be = 10,
  Fs = 11,
  eo = 12,
  ps = 13,
  Xg = 14,
  St = 15,
  Es = 16,
  wr = 17,
  bt = 18,
  Jg = 19,
  to = 20,
  Hs = 21,
  Kt = 22,
  Mn = 23,
  tt = 24,
  MA = 25,
  Ot = 26,
  _t = 27,
  rt = 28,
  Wg = 29,
  Je = 30,
  Yg = 31,
  Qr = 32,
  hr = 33,
  vs = 34,
  ms = 35,
  Is = 36,
  Ar = 37,
  ys = 38,
  Rr = 39,
  Gr = 40,
  Rn = 41,
  ja = 42,
  Zg = 43,
  jg = [9001, 65288],
  za = "!",
  Z = "×",
  dr = "÷",
  bs = Mg(Vg),
  he = [Je, Is],
  Ks = [Ng, Wa, Ya, Pg],
  qa = [be, Za],
  ro = [_t, Ot],
  zg = Ks.concat(qa),
  no = [ys, Rr, Gr, vs, ms],
  qg = [St, ps],
  $g = function (A, e) {
    e === void 0 && (e = "strict");
    var t = [],
      r = [],
      n = [];
    return (
      A.forEach(function (s, i) {
        var o = bs.get(s);
        if (
          (o > qi ? (n.push(!0), (o -= qi)) : n.push(!1),
          ["normal", "auto", "loose"].indexOf(e) !== -1 &&
            [8208, 8211, 12316, 12448].indexOf(s) !== -1)
        )
          return r.push(i), t.push(Es);
        if (o === kg || o === Fs) {
          if (i === 0) return r.push(i), t.push(Je);
          var a = t[i - 1];
          return zg.indexOf(a) === -1
            ? (r.push(r[i - 1]), t.push(a))
            : (r.push(i), t.push(Je));
        }
        if ((r.push(i), o === Yg)) return t.push(e === "strict" ? Hs : Ar);
        if (o === ja || o === Wg) return t.push(Je);
        if (o === Zg)
          return (s >= 131072 && s <= 196605) || (s >= 196608 && s <= 262141)
            ? t.push(Ar)
            : t.push(Je);
        t.push(o);
      }),
      [r, t, n]
    );
  },
  Gn = function (A, e, t, r) {
    var n = r[t];
    if (Array.isArray(A) ? A.indexOf(n) !== -1 : A === n)
      for (var s = t; s <= r.length; ) {
        s++;
        var i = r[s];
        if (i === e) return !0;
        if (i !== be) break;
      }
    if (n === be)
      for (var s = t; s > 0; ) {
        s--;
        var o = r[s];
        if (Array.isArray(A) ? A.indexOf(o) !== -1 : A === o)
          for (var a = t; a <= r.length; ) {
            a++;
            var i = r[a];
            if (i === e) return !0;
            if (i !== be) break;
          }
        if (o !== be) break;
      }
    return !1;
  },
  so = function (A, e) {
    for (var t = A; t >= 0; ) {
      var r = e[t];
      if (r === be) t--;
      else return r;
    }
    return 0;
  },
  Aw = function (A, e, t, r, n) {
    if (t[r] === 0) return Z;
    var s = r - 1;
    if (Array.isArray(n) && n[s] === !0) return Z;
    var i = s - 1,
      o = s + 1,
      a = e[s],
      B = i >= 0 ? e[i] : 0,
      l = e[o];
    if (a === Wa && l === Ya) return Z;
    if (Ks.indexOf(a) !== -1) return za;
    if (Ks.indexOf(l) !== -1 || qa.indexOf(l) !== -1) return Z;
    if (so(s, e) === Za) return dr;
    if (
      bs.get(A[s]) === Fs ||
      ((a === Qr || a === hr) && bs.get(A[o]) === Fs) ||
      a === $i ||
      l === $i ||
      a === Ao ||
      ([be, ps, St].indexOf(a) === -1 && l === Ao) ||
      [wr, bt, Jg, tt, rt].indexOf(l) !== -1 ||
      so(s, e) === Kt ||
      Gn(Mn, Kt, s, e) ||
      Gn([wr, bt], Hs, s, e) ||
      Gn(eo, eo, s, e)
    )
      return Z;
    if (a === be) return dr;
    if (a === Mn || l === Mn) return Z;
    if (l === Es || a === Es) return dr;
    if (
      [ps, St, Hs].indexOf(l) !== -1 ||
      a === Xg ||
      (B === Is && qg.indexOf(a) !== -1) ||
      (a === rt && l === Is) ||
      l === to ||
      (he.indexOf(l) !== -1 && a === MA) ||
      (he.indexOf(a) !== -1 && l === MA) ||
      (a === _t && [Ar, Qr, hr].indexOf(l) !== -1) ||
      ([Ar, Qr, hr].indexOf(a) !== -1 && l === Ot) ||
      (he.indexOf(a) !== -1 && ro.indexOf(l) !== -1) ||
      (ro.indexOf(a) !== -1 && he.indexOf(l) !== -1) ||
      ([_t, Ot].indexOf(a) !== -1 &&
        (l === MA || ([Kt, St].indexOf(l) !== -1 && e[o + 1] === MA))) ||
      ([Kt, St].indexOf(a) !== -1 && l === MA) ||
      (a === MA && [MA, rt, tt].indexOf(l) !== -1)
    )
      return Z;
    if ([MA, rt, tt, wr, bt].indexOf(l) !== -1)
      for (var c = s; c >= 0; ) {
        var f = e[c];
        if (f === MA) return Z;
        if ([rt, tt].indexOf(f) !== -1) c--;
        else break;
      }
    if ([_t, Ot].indexOf(l) !== -1)
      for (var c = [wr, bt].indexOf(a) !== -1 ? i : s; c >= 0; ) {
        var f = e[c];
        if (f === MA) return Z;
        if ([rt, tt].indexOf(f) !== -1) c--;
        else break;
      }
    if (
      (ys === a && [ys, Rr, vs, ms].indexOf(l) !== -1) ||
      ([Rr, vs].indexOf(a) !== -1 && [Rr, Gr].indexOf(l) !== -1) ||
      ([Gr, ms].indexOf(a) !== -1 && l === Gr) ||
      (no.indexOf(a) !== -1 && [to, Ot].indexOf(l) !== -1) ||
      (no.indexOf(l) !== -1 && a === _t) ||
      (he.indexOf(a) !== -1 && he.indexOf(l) !== -1) ||
      (a === tt && he.indexOf(l) !== -1) ||
      (he.concat(MA).indexOf(a) !== -1 &&
        l === Kt &&
        jg.indexOf(A[o]) === -1) ||
      (he.concat(MA).indexOf(l) !== -1 && a === bt)
    )
      return Z;
    if (a === Rn && l === Rn) {
      for (var C = t[s], d = 1; C > 0 && (C--, e[C] === Rn); ) d++;
      if (d % 2 !== 0) return Z;
    }
    return a === Qr && l === hr ? Z : dr;
  },
  ew = function (A, e) {
    e || (e = { lineBreak: "normal", wordBreak: "normal" });
    var t = $g(A, e.lineBreak),
      r = t[0],
      n = t[1],
      s = t[2];
    (e.wordBreak === "break-all" || e.wordBreak === "break-word") &&
      (n = n.map(function (o) {
        return [MA, Je, ja].indexOf(o) !== -1 ? Ar : o;
      }));
    var i =
      e.wordBreak === "keep-all"
        ? s.map(function (o, a) {
            return o && A[a] >= 19968 && A[a] <= 40959;
          })
        : void 0;
    return [r, n, i];
  },
  tw = (function () {
    function A(e, t, r, n) {
      (this.codePoints = e),
        (this.required = t === za),
        (this.start = r),
        (this.end = n);
    }
    return (
      (A.prototype.slice = function () {
        return fA.apply(void 0, this.codePoints.slice(this.start, this.end));
      }),
      A
    );
  })(),
  rw = function (A, e) {
    var t = hn(A),
      r = ew(t, e),
      n = r[0],
      s = r[1],
      i = r[2],
      o = t.length,
      a = 0,
      B = 0;
    return {
      next: function () {
        if (B >= o) return { done: !0, value: null };
        for (var l = Z; B < o && (l = Aw(t, s, n, ++B, i)) === Z; );
        if (l !== Z || B === o) {
          var c = new tw(t, l, a, B);
          return (a = B), { value: c, done: !1 };
        }
        return { done: !0, value: null };
      },
    };
  },
  nw = 1 << 0,
  sw = 1 << 1,
  rr = 1 << 2,
  io = 1 << 3,
  Wr = 10,
  oo = 47,
  kt = 92,
  iw = 9,
  ow = 32,
  Cr = 34,
  xt = 61,
  aw = 35,
  Bw = 36,
  lw = 37,
  Ur = 39,
  Fr = 40,
  Lt = 41,
  cw = 95,
  DA = 45,
  uw = 33,
  fw = 60,
  gw = 62,
  ww = 64,
  Qw = 91,
  hw = 93,
  dw = 61,
  Cw = 123,
  pr = 63,
  Uw = 125,
  ao = 124,
  Fw = 126,
  pw = 128,
  Bo = 65533,
  Vn = 42,
  Ye = 43,
  Ew = 44,
  Hw = 58,
  vw = 59,
  er = 46,
  mw = 0,
  Iw = 8,
  yw = 11,
  bw = 14,
  Kw = 31,
  xw = 127,
  Be = -1,
  $a = 48,
  AB = 97,
  eB = 101,
  Lw = 102,
  Tw = 117,
  Dw = 122,
  tB = 65,
  rB = 69,
  nB = 70,
  Sw = 85,
  Ow = 90,
  mA = function (A) {
    return A >= $a && A <= 57;
  },
  _w = function (A) {
    return A >= 55296 && A <= 57343;
  },
  nt = function (A) {
    return mA(A) || (A >= tB && A <= nB) || (A >= AB && A <= Lw);
  },
  Mw = function (A) {
    return A >= AB && A <= Dw;
  },
  Rw = function (A) {
    return A >= tB && A <= Ow;
  },
  Gw = function (A) {
    return Mw(A) || Rw(A);
  },
  Vw = function (A) {
    return A >= pw;
  },
  Er = function (A) {
    return A === Wr || A === iw || A === ow;
  },
  Yr = function (A) {
    return Gw(A) || Vw(A) || A === cw;
  },
  lo = function (A) {
    return Yr(A) || mA(A) || A === DA;
  },
  Nw = function (A) {
    return (A >= mw && A <= Iw) || A === yw || (A >= bw && A <= Kw) || A === xw;
  },
  ye = function (A, e) {
    return A !== kt ? !1 : e !== Wr;
  },
  Hr = function (A, e, t) {
    return A === DA ? Yr(e) || ye(e, t) : Yr(A) ? !0 : !!(A === kt && ye(A, e));
  },
  Nn = function (A, e, t) {
    return A === Ye || A === DA
      ? mA(e)
        ? !0
        : e === er && mA(t)
      : mA(A === er ? e : A);
  },
  kw = function (A) {
    var e = 0,
      t = 1;
    (A[e] === Ye || A[e] === DA) && (A[e] === DA && (t = -1), e++);
    for (var r = []; mA(A[e]); ) r.push(A[e++]);
    var n = r.length ? parseInt(fA.apply(void 0, r), 10) : 0;
    A[e] === er && e++;
    for (var s = []; mA(A[e]); ) s.push(A[e++]);
    var i = s.length,
      o = i ? parseInt(fA.apply(void 0, s), 10) : 0;
    (A[e] === rB || A[e] === eB) && e++;
    var a = 1;
    (A[e] === Ye || A[e] === DA) && (A[e] === DA && (a = -1), e++);
    for (var B = []; mA(A[e]); ) B.push(A[e++]);
    var l = B.length ? parseInt(fA.apply(void 0, B), 10) : 0;
    return t * (n + o * Math.pow(10, -i)) * Math.pow(10, a * l);
  },
  Pw = { type: 2 },
  Xw = { type: 3 },
  Jw = { type: 4 },
  Ww = { type: 13 },
  Yw = { type: 8 },
  Zw = { type: 21 },
  jw = { type: 9 },
  zw = { type: 10 },
  qw = { type: 11 },
  $w = { type: 12 },
  AQ = { type: 14 },
  vr = { type: 23 },
  eQ = { type: 1 },
  tQ = { type: 25 },
  rQ = { type: 24 },
  nQ = { type: 26 },
  sQ = { type: 27 },
  iQ = { type: 28 },
  oQ = { type: 29 },
  aQ = { type: 31 },
  xs = { type: 32 },
  sB = (function () {
    function A() {
      this._value = [];
    }
    return (
      (A.prototype.write = function (e) {
        this._value = this._value.concat(hn(e));
      }),
      (A.prototype.read = function () {
        for (var e = [], t = this.consumeToken(); t !== xs; )
          e.push(t), (t = this.consumeToken());
        return e;
      }),
      (A.prototype.consumeToken = function () {
        var e = this.consumeCodePoint();
        switch (e) {
          case Cr:
            return this.consumeStringToken(Cr);
          case aw:
            var t = this.peekCodePoint(0),
              r = this.peekCodePoint(1),
              n = this.peekCodePoint(2);
            if (lo(t) || ye(r, n)) {
              var s = Hr(t, r, n) ? sw : nw,
                i = this.consumeName();
              return { type: 5, value: i, flags: s };
            }
            break;
          case Bw:
            if (this.peekCodePoint(0) === xt)
              return this.consumeCodePoint(), Ww;
            break;
          case Ur:
            return this.consumeStringToken(Ur);
          case Fr:
            return Pw;
          case Lt:
            return Xw;
          case Vn:
            if (this.peekCodePoint(0) === xt)
              return this.consumeCodePoint(), AQ;
            break;
          case Ye:
            if (Nn(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case Ew:
            return Jw;
          case DA:
            var o = e,
              a = this.peekCodePoint(0),
              B = this.peekCodePoint(1);
            if (Nn(o, a, B))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            if (Hr(o, a, B))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            if (a === DA && B === gw)
              return this.consumeCodePoint(), this.consumeCodePoint(), rQ;
            break;
          case er:
            if (Nn(e, this.peekCodePoint(0), this.peekCodePoint(1)))
              return this.reconsumeCodePoint(e), this.consumeNumericToken();
            break;
          case oo:
            if (this.peekCodePoint(0) === Vn)
              for (this.consumeCodePoint(); ; ) {
                var l = this.consumeCodePoint();
                if (l === Vn && ((l = this.consumeCodePoint()), l === oo))
                  return this.consumeToken();
                if (l === Be) return this.consumeToken();
              }
            break;
          case Hw:
            return nQ;
          case vw:
            return sQ;
          case fw:
            if (
              this.peekCodePoint(0) === uw &&
              this.peekCodePoint(1) === DA &&
              this.peekCodePoint(2) === DA
            )
              return this.consumeCodePoint(), this.consumeCodePoint(), tQ;
            break;
          case ww:
            var c = this.peekCodePoint(0),
              f = this.peekCodePoint(1),
              C = this.peekCodePoint(2);
            if (Hr(c, f, C)) {
              var i = this.consumeName();
              return { type: 7, value: i };
            }
            break;
          case Qw:
            return iQ;
          case kt:
            if (ye(e, this.peekCodePoint(0)))
              return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
            break;
          case hw:
            return oQ;
          case dw:
            if (this.peekCodePoint(0) === xt)
              return this.consumeCodePoint(), Yw;
            break;
          case Cw:
            return qw;
          case Uw:
            return $w;
          case Tw:
          case Sw:
            var d = this.peekCodePoint(0),
              Q = this.peekCodePoint(1);
            return (
              d === Ye &&
                (nt(Q) || Q === pr) &&
                (this.consumeCodePoint(), this.consumeUnicodeRangeToken()),
              this.reconsumeCodePoint(e),
              this.consumeIdentLikeToken()
            );
          case ao:
            if (this.peekCodePoint(0) === xt)
              return this.consumeCodePoint(), jw;
            if (this.peekCodePoint(0) === ao)
              return this.consumeCodePoint(), Zw;
            break;
          case Fw:
            if (this.peekCodePoint(0) === xt)
              return this.consumeCodePoint(), zw;
            break;
          case Be:
            return xs;
        }
        return Er(e)
          ? (this.consumeWhiteSpace(), aQ)
          : mA(e)
          ? (this.reconsumeCodePoint(e), this.consumeNumericToken())
          : Yr(e)
          ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken())
          : { type: 6, value: fA(e) };
      }),
      (A.prototype.consumeCodePoint = function () {
        var e = this._value.shift();
        return typeof e > "u" ? -1 : e;
      }),
      (A.prototype.reconsumeCodePoint = function (e) {
        this._value.unshift(e);
      }),
      (A.prototype.peekCodePoint = function (e) {
        return e >= this._value.length ? -1 : this._value[e];
      }),
      (A.prototype.consumeUnicodeRangeToken = function () {
        for (var e = [], t = this.consumeCodePoint(); nt(t) && e.length < 6; )
          e.push(t), (t = this.consumeCodePoint());
        for (var r = !1; t === pr && e.length < 6; )
          e.push(t), (t = this.consumeCodePoint()), (r = !0);
        if (r) {
          var n = parseInt(
              fA.apply(
                void 0,
                e.map(function (a) {
                  return a === pr ? $a : a;
                })
              ),
              16
            ),
            s = parseInt(
              fA.apply(
                void 0,
                e.map(function (a) {
                  return a === pr ? nB : a;
                })
              ),
              16
            );
          return { type: 30, start: n, end: s };
        }
        var i = parseInt(fA.apply(void 0, e), 16);
        if (this.peekCodePoint(0) === DA && nt(this.peekCodePoint(1))) {
          this.consumeCodePoint(), (t = this.consumeCodePoint());
          for (var o = []; nt(t) && o.length < 6; )
            o.push(t), (t = this.consumeCodePoint());
          var s = parseInt(fA.apply(void 0, o), 16);
          return { type: 30, start: i, end: s };
        } else return { type: 30, start: i, end: i };
      }),
      (A.prototype.consumeIdentLikeToken = function () {
        var e = this.consumeName();
        return e.toLowerCase() === "url" && this.peekCodePoint(0) === Fr
          ? (this.consumeCodePoint(), this.consumeUrlToken())
          : this.peekCodePoint(0) === Fr
          ? (this.consumeCodePoint(), { type: 19, value: e })
          : { type: 20, value: e };
      }),
      (A.prototype.consumeUrlToken = function () {
        var e = [];
        if ((this.consumeWhiteSpace(), this.peekCodePoint(0) === Be))
          return { type: 22, value: "" };
        var t = this.peekCodePoint(0);
        if (t === Ur || t === Cr) {
          var r = this.consumeStringToken(this.consumeCodePoint());
          return r.type === 0 &&
            (this.consumeWhiteSpace(),
            this.peekCodePoint(0) === Be || this.peekCodePoint(0) === Lt)
            ? (this.consumeCodePoint(), { type: 22, value: r.value })
            : (this.consumeBadUrlRemnants(), vr);
        }
        for (;;) {
          var n = this.consumeCodePoint();
          if (n === Be || n === Lt)
            return { type: 22, value: fA.apply(void 0, e) };
          if (Er(n))
            return (
              this.consumeWhiteSpace(),
              this.peekCodePoint(0) === Be || this.peekCodePoint(0) === Lt
                ? (this.consumeCodePoint(),
                  { type: 22, value: fA.apply(void 0, e) })
                : (this.consumeBadUrlRemnants(), vr)
            );
          if (n === Cr || n === Ur || n === Fr || Nw(n))
            return this.consumeBadUrlRemnants(), vr;
          if (n === kt)
            if (ye(n, this.peekCodePoint(0)))
              e.push(this.consumeEscapedCodePoint());
            else return this.consumeBadUrlRemnants(), vr;
          else e.push(n);
        }
      }),
      (A.prototype.consumeWhiteSpace = function () {
        for (; Er(this.peekCodePoint(0)); ) this.consumeCodePoint();
      }),
      (A.prototype.consumeBadUrlRemnants = function () {
        for (;;) {
          var e = this.consumeCodePoint();
          if (e === Lt || e === Be) return;
          ye(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
        }
      }),
      (A.prototype.consumeStringSlice = function (e) {
        for (var t = 5e4, r = ""; e > 0; ) {
          var n = Math.min(t, e);
          (r += fA.apply(void 0, this._value.splice(0, n))), (e -= n);
        }
        return this._value.shift(), r;
      }),
      (A.prototype.consumeStringToken = function (e) {
        var t = "",
          r = 0;
        do {
          var n = this._value[r];
          if (n === Be || n === void 0 || n === e)
            return (t += this.consumeStringSlice(r)), { type: 0, value: t };
          if (n === Wr) return this._value.splice(0, r), eQ;
          if (n === kt) {
            var s = this._value[r + 1];
            s !== Be &&
              s !== void 0 &&
              (s === Wr
                ? ((t += this.consumeStringSlice(r)),
                  (r = -1),
                  this._value.shift())
                : ye(n, s) &&
                  ((t += this.consumeStringSlice(r)),
                  (t += fA(this.consumeEscapedCodePoint())),
                  (r = -1)));
          }
          r++;
        } while (!0);
      }),
      (A.prototype.consumeNumber = function () {
        var e = [],
          t = rr,
          r = this.peekCodePoint(0);
        for (
          (r === Ye || r === DA) && e.push(this.consumeCodePoint());
          mA(this.peekCodePoint(0));

        )
          e.push(this.consumeCodePoint());
        r = this.peekCodePoint(0);
        var n = this.peekCodePoint(1);
        if (r === er && mA(n))
          for (
            e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = io;
            mA(this.peekCodePoint(0));

          )
            e.push(this.consumeCodePoint());
        (r = this.peekCodePoint(0)), (n = this.peekCodePoint(1));
        var s = this.peekCodePoint(2);
        if (
          (r === rB || r === eB) &&
          (((n === Ye || n === DA) && mA(s)) || mA(n))
        )
          for (
            e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = io;
            mA(this.peekCodePoint(0));

          )
            e.push(this.consumeCodePoint());
        return [kw(e), t];
      }),
      (A.prototype.consumeNumericToken = function () {
        var e = this.consumeNumber(),
          t = e[0],
          r = e[1],
          n = this.peekCodePoint(0),
          s = this.peekCodePoint(1),
          i = this.peekCodePoint(2);
        if (Hr(n, s, i)) {
          var o = this.consumeName();
          return { type: 15, number: t, flags: r, unit: o };
        }
        return n === lw
          ? (this.consumeCodePoint(), { type: 16, number: t, flags: r })
          : { type: 17, number: t, flags: r };
      }),
      (A.prototype.consumeEscapedCodePoint = function () {
        var e = this.consumeCodePoint();
        if (nt(e)) {
          for (var t = fA(e); nt(this.peekCodePoint(0)) && t.length < 6; )
            t += fA(this.consumeCodePoint());
          Er(this.peekCodePoint(0)) && this.consumeCodePoint();
          var r = parseInt(t, 16);
          return r === 0 || _w(r) || r > 1114111 ? Bo : r;
        }
        return e === Be ? Bo : e;
      }),
      (A.prototype.consumeName = function () {
        for (var e = ""; ; ) {
          var t = this.consumeCodePoint();
          if (lo(t)) e += fA(t);
          else if (ye(t, this.peekCodePoint(0)))
            e += fA(this.consumeEscapedCodePoint());
          else return this.reconsumeCodePoint(t), e;
        }
      }),
      A
    );
  })(),
  iB = (function () {
    function A(e) {
      this._tokens = e;
    }
    return (
      (A.create = function (e) {
        var t = new sB();
        return t.write(e), new A(t.read());
      }),
      (A.parseValue = function (e) {
        return A.create(e).parseComponentValue();
      }),
      (A.parseValues = function (e) {
        return A.create(e).parseComponentValues();
      }),
      (A.prototype.parseComponentValue = function () {
        for (var e = this.consumeToken(); e.type === 31; )
          e = this.consumeToken();
        if (e.type === 32)
          throw new SyntaxError(
            "Error parsing CSS component value, unexpected EOF"
          );
        this.reconsumeToken(e);
        var t = this.consumeComponentValue();
        do e = this.consumeToken();
        while (e.type === 31);
        if (e.type === 32) return t;
        throw new SyntaxError(
          "Error parsing CSS component value, multiple values found when expecting only one"
        );
      }),
      (A.prototype.parseComponentValues = function () {
        for (var e = []; ; ) {
          var t = this.consumeComponentValue();
          if (t.type === 32) return e;
          e.push(t), e.push();
        }
      }),
      (A.prototype.consumeComponentValue = function () {
        var e = this.consumeToken();
        switch (e.type) {
          case 11:
          case 28:
          case 2:
            return this.consumeSimpleBlock(e.type);
          case 19:
            return this.consumeFunction(e);
        }
        return e;
      }),
      (A.prototype.consumeSimpleBlock = function (e) {
        for (var t = { type: e, values: [] }, r = this.consumeToken(); ; ) {
          if (r.type === 32 || lQ(r, e)) return t;
          this.reconsumeToken(r),
            t.values.push(this.consumeComponentValue()),
            (r = this.consumeToken());
        }
      }),
      (A.prototype.consumeFunction = function (e) {
        for (var t = { name: e.value, values: [], type: 18 }; ; ) {
          var r = this.consumeToken();
          if (r.type === 32 || r.type === 3) return t;
          this.reconsumeToken(r), t.values.push(this.consumeComponentValue());
        }
      }),
      (A.prototype.consumeToken = function () {
        var e = this._tokens.shift();
        return typeof e > "u" ? xs : e;
      }),
      (A.prototype.reconsumeToken = function (e) {
        this._tokens.unshift(e);
      }),
      A
    );
  })(),
  nr = function (A) {
    return A.type === 15;
  },
  vt = function (A) {
    return A.type === 17;
  },
  nA = function (A) {
    return A.type === 20;
  },
  BQ = function (A) {
    return A.type === 0;
  },
  Ls = function (A, e) {
    return nA(A) && A.value === e;
  },
  oB = function (A) {
    return A.type !== 31;
  },
  Ft = function (A) {
    return A.type !== 31 && A.type !== 4;
  },
  ge = function (A) {
    var e = [],
      t = [];
    return (
      A.forEach(function (r) {
        if (r.type === 4) {
          if (t.length === 0)
            throw new Error("Error parsing function args, zero tokens for arg");
          e.push(t), (t = []);
          return;
        }
        r.type !== 31 && t.push(r);
      }),
      t.length && e.push(t),
      e
    );
  },
  lQ = function (A, e) {
    return (e === 11 && A.type === 12) || (e === 28 && A.type === 29)
      ? !0
      : e === 2 && A.type === 3;
  },
  Me = function (A) {
    return A.type === 17 || A.type === 15;
  },
  QA = function (A) {
    return A.type === 16 || Me(A);
  },
  aB = function (A) {
    return A.length > 1 ? [A[0], A[1]] : [A[0]];
  },
  EA = { type: 17, number: 0, flags: rr },
  ai = { type: 16, number: 50, flags: rr },
  Ke = { type: 16, number: 100, flags: rr },
  Mt = function (A, e, t) {
    var r = A[0],
      n = A[1];
    return [iA(r, e), iA(typeof n < "u" ? n : r, t)];
  },
  iA = function (A, e) {
    if (A.type === 16) return (A.number / 100) * e;
    if (nr(A))
      switch (A.unit) {
        case "rem":
        case "em":
          return 16 * A.number;
        case "px":
        default:
          return A.number;
      }
    return A.number;
  },
  BB = "deg",
  lB = "grad",
  cB = "rad",
  uB = "turn",
  dn = {
    name: "angle",
    parse: function (A, e) {
      if (e.type === 15)
        switch (e.unit) {
          case BB:
            return (Math.PI * e.number) / 180;
          case lB:
            return (Math.PI / 200) * e.number;
          case cB:
            return e.number;
          case uB:
            return Math.PI * 2 * e.number;
        }
      throw new Error("Unsupported angle type");
    },
  },
  fB = function (A) {
    return (
      A.type === 15 &&
      (A.unit === BB || A.unit === lB || A.unit === cB || A.unit === uB)
    );
  },
  gB = function (A) {
    var e = A.filter(nA)
      .map(function (t) {
        return t.value;
      })
      .join(" ");
    switch (e) {
      case "to bottom right":
      case "to right bottom":
      case "left top":
      case "top left":
        return [EA, EA];
      case "to top":
      case "bottom":
        return JA(0);
      case "to bottom left":
      case "to left bottom":
      case "right top":
      case "top right":
        return [EA, Ke];
      case "to right":
      case "left":
        return JA(90);
      case "to top left":
      case "to left top":
      case "right bottom":
      case "bottom right":
        return [Ke, Ke];
      case "to bottom":
      case "top":
        return JA(180);
      case "to top right":
      case "to right top":
      case "left bottom":
      case "bottom left":
        return [Ke, EA];
      case "to left":
      case "right":
        return JA(270);
    }
    return 0;
  },
  JA = function (A) {
    return (Math.PI * A) / 180;
  },
  De = {
    name: "color",
    parse: function (A, e) {
      if (e.type === 18) {
        var t = cQ[e.name];
        if (typeof t > "u")
          throw new Error(
            'Attempting to parse an unsupported color function "' + e.name + '"'
          );
        return t(A, e.values);
      }
      if (e.type === 5) {
        if (e.value.length === 3) {
          var r = e.value.substring(0, 1),
            n = e.value.substring(1, 2),
            s = e.value.substring(2, 3);
          return xe(
            parseInt(r + r, 16),
            parseInt(n + n, 16),
            parseInt(s + s, 16),
            1
          );
        }
        if (e.value.length === 4) {
          var r = e.value.substring(0, 1),
            n = e.value.substring(1, 2),
            s = e.value.substring(2, 3),
            i = e.value.substring(3, 4);
          return xe(
            parseInt(r + r, 16),
            parseInt(n + n, 16),
            parseInt(s + s, 16),
            parseInt(i + i, 16) / 255
          );
        }
        if (e.value.length === 6) {
          var r = e.value.substring(0, 2),
            n = e.value.substring(2, 4),
            s = e.value.substring(4, 6);
          return xe(parseInt(r, 16), parseInt(n, 16), parseInt(s, 16), 1);
        }
        if (e.value.length === 8) {
          var r = e.value.substring(0, 2),
            n = e.value.substring(2, 4),
            s = e.value.substring(4, 6),
            i = e.value.substring(6, 8);
          return xe(
            parseInt(r, 16),
            parseInt(n, 16),
            parseInt(s, 16),
            parseInt(i, 16) / 255
          );
        }
      }
      if (e.type === 20) {
        var o = Ue[e.value.toUpperCase()];
        if (typeof o < "u") return o;
      }
      return Ue.TRANSPARENT;
    },
  },
  Se = function (A) {
    return (255 & A) === 0;
  },
  UA = function (A) {
    var e = 255 & A,
      t = 255 & (A >> 8),
      r = 255 & (A >> 16),
      n = 255 & (A >> 24);
    return e < 255
      ? "rgba(" + n + "," + r + "," + t + "," + e / 255 + ")"
      : "rgb(" + n + "," + r + "," + t + ")";
  },
  xe = function (A, e, t, r) {
    return (
      ((A << 24) | (e << 16) | (t << 8) | (Math.round(r * 255) << 0)) >>> 0
    );
  },
  co = function (A, e) {
    if (A.type === 17) return A.number;
    if (A.type === 16) {
      var t = e === 3 ? 1 : 255;
      return e === 3 ? (A.number / 100) * t : Math.round((A.number / 100) * t);
    }
    return 0;
  },
  uo = function (A, e) {
    var t = e.filter(Ft);
    if (t.length === 3) {
      var r = t.map(co),
        n = r[0],
        s = r[1],
        i = r[2];
      return xe(n, s, i, 1);
    }
    if (t.length === 4) {
      var o = t.map(co),
        n = o[0],
        s = o[1],
        i = o[2],
        a = o[3];
      return xe(n, s, i, a);
    }
    return 0;
  };
function kn(A, e, t) {
  return (
    t < 0 && (t += 1),
    t >= 1 && (t -= 1),
    t < 1 / 6
      ? (e - A) * t * 6 + A
      : t < 1 / 2
      ? e
      : t < 2 / 3
      ? (e - A) * 6 * (2 / 3 - t) + A
      : A
  );
}
var fo = function (A, e) {
    var t = e.filter(Ft),
      r = t[0],
      n = t[1],
      s = t[2],
      i = t[3],
      o = (r.type === 17 ? JA(r.number) : dn.parse(A, r)) / (Math.PI * 2),
      a = QA(n) ? n.number / 100 : 0,
      B = QA(s) ? s.number / 100 : 0,
      l = typeof i < "u" && QA(i) ? iA(i, 1) : 1;
    if (a === 0) return xe(B * 255, B * 255, B * 255, 1);
    var c = B <= 0.5 ? B * (a + 1) : B + a - B * a,
      f = B * 2 - c,
      C = kn(f, c, o + 1 / 3),
      d = kn(f, c, o),
      Q = kn(f, c, o - 1 / 3);
    return xe(C * 255, d * 255, Q * 255, l);
  },
  cQ = { hsl: fo, hsla: fo, rgb: uo, rgba: uo },
  Pt = function (A, e) {
    return De.parse(A, iB.create(e).parseComponentValue());
  },
  Ue = {
    ALICEBLUE: 4042850303,
    ANTIQUEWHITE: 4209760255,
    AQUA: 16777215,
    AQUAMARINE: 2147472639,
    AZURE: 4043309055,
    BEIGE: 4126530815,
    BISQUE: 4293182719,
    BLACK: 255,
    BLANCHEDALMOND: 4293643775,
    BLUE: 65535,
    BLUEVIOLET: 2318131967,
    BROWN: 2771004159,
    BURLYWOOD: 3736635391,
    CADETBLUE: 1604231423,
    CHARTREUSE: 2147418367,
    CHOCOLATE: 3530104575,
    CORAL: 4286533887,
    CORNFLOWERBLUE: 1687547391,
    CORNSILK: 4294499583,
    CRIMSON: 3692313855,
    CYAN: 16777215,
    DARKBLUE: 35839,
    DARKCYAN: 9145343,
    DARKGOLDENROD: 3095837695,
    DARKGRAY: 2846468607,
    DARKGREEN: 6553855,
    DARKGREY: 2846468607,
    DARKKHAKI: 3182914559,
    DARKMAGENTA: 2332068863,
    DARKOLIVEGREEN: 1433087999,
    DARKORANGE: 4287365375,
    DARKORCHID: 2570243327,
    DARKRED: 2332033279,
    DARKSALMON: 3918953215,
    DARKSEAGREEN: 2411499519,
    DARKSLATEBLUE: 1211993087,
    DARKSLATEGRAY: 793726975,
    DARKSLATEGREY: 793726975,
    DARKTURQUOISE: 13554175,
    DARKVIOLET: 2483082239,
    DEEPPINK: 4279538687,
    DEEPSKYBLUE: 12582911,
    DIMGRAY: 1768516095,
    DIMGREY: 1768516095,
    DODGERBLUE: 512819199,
    FIREBRICK: 2988581631,
    FLORALWHITE: 4294635775,
    FORESTGREEN: 579543807,
    FUCHSIA: 4278255615,
    GAINSBORO: 3705462015,
    GHOSTWHITE: 4177068031,
    GOLD: 4292280575,
    GOLDENROD: 3668254975,
    GRAY: 2155905279,
    GREEN: 8388863,
    GREENYELLOW: 2919182335,
    GREY: 2155905279,
    HONEYDEW: 4043305215,
    HOTPINK: 4285117695,
    INDIANRED: 3445382399,
    INDIGO: 1258324735,
    IVORY: 4294963455,
    KHAKI: 4041641215,
    LAVENDER: 3873897215,
    LAVENDERBLUSH: 4293981695,
    LAWNGREEN: 2096890111,
    LEMONCHIFFON: 4294626815,
    LIGHTBLUE: 2916673279,
    LIGHTCORAL: 4034953471,
    LIGHTCYAN: 3774873599,
    LIGHTGOLDENRODYELLOW: 4210742015,
    LIGHTGRAY: 3553874943,
    LIGHTGREEN: 2431553791,
    LIGHTGREY: 3553874943,
    LIGHTPINK: 4290167295,
    LIGHTSALMON: 4288707327,
    LIGHTSEAGREEN: 548580095,
    LIGHTSKYBLUE: 2278488831,
    LIGHTSLATEGRAY: 2005441023,
    LIGHTSLATEGREY: 2005441023,
    LIGHTSTEELBLUE: 2965692159,
    LIGHTYELLOW: 4294959359,
    LIME: 16711935,
    LIMEGREEN: 852308735,
    LINEN: 4210091775,
    MAGENTA: 4278255615,
    MAROON: 2147483903,
    MEDIUMAQUAMARINE: 1724754687,
    MEDIUMBLUE: 52735,
    MEDIUMORCHID: 3126187007,
    MEDIUMPURPLE: 2473647103,
    MEDIUMSEAGREEN: 1018393087,
    MEDIUMSLATEBLUE: 2070474495,
    MEDIUMSPRINGGREEN: 16423679,
    MEDIUMTURQUOISE: 1221709055,
    MEDIUMVIOLETRED: 3340076543,
    MIDNIGHTBLUE: 421097727,
    MINTCREAM: 4127193855,
    MISTYROSE: 4293190143,
    MOCCASIN: 4293178879,
    NAVAJOWHITE: 4292783615,
    NAVY: 33023,
    OLDLACE: 4260751103,
    OLIVE: 2155872511,
    OLIVEDRAB: 1804477439,
    ORANGE: 4289003775,
    ORANGERED: 4282712319,
    ORCHID: 3664828159,
    PALEGOLDENROD: 4008225535,
    PALEGREEN: 2566625535,
    PALETURQUOISE: 2951671551,
    PALEVIOLETRED: 3681588223,
    PAPAYAWHIP: 4293907967,
    PEACHPUFF: 4292524543,
    PERU: 3448061951,
    PINK: 4290825215,
    PLUM: 3718307327,
    POWDERBLUE: 2967529215,
    PURPLE: 2147516671,
    REBECCAPURPLE: 1714657791,
    RED: 4278190335,
    ROSYBROWN: 3163525119,
    ROYALBLUE: 1097458175,
    SADDLEBROWN: 2336560127,
    SALMON: 4202722047,
    SANDYBROWN: 4104413439,
    SEAGREEN: 780883967,
    SEASHELL: 4294307583,
    SIENNA: 2689740287,
    SILVER: 3233857791,
    SKYBLUE: 2278484991,
    SLATEBLUE: 1784335871,
    SLATEGRAY: 1887473919,
    SLATEGREY: 1887473919,
    SNOW: 4294638335,
    SPRINGGREEN: 16744447,
    STEELBLUE: 1182971135,
    TAN: 3535047935,
    TEAL: 8421631,
    THISTLE: 3636451583,
    TOMATO: 4284696575,
    TRANSPARENT: 0,
    TURQUOISE: 1088475391,
    VIOLET: 4001558271,
    WHEAT: 4125012991,
    WHITE: 4294967295,
    WHITESMOKE: 4126537215,
    YELLOW: 4294902015,
    YELLOWGREEN: 2597139199,
  },
  uQ = {
    name: "background-clip",
    initialValue: "border-box",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e.map(function (t) {
        if (nA(t))
          switch (t.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
        return 0;
      });
    },
  },
  fQ = {
    name: "background-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color",
  },
  Cn = function (A, e) {
    var t = De.parse(A, e[0]),
      r = e[1];
    return r && QA(r) ? { color: t, stop: r } : { color: t, stop: null };
  },
  go = function (A, e) {
    var t = A[0],
      r = A[A.length - 1];
    t.stop === null && (t.stop = EA), r.stop === null && (r.stop = Ke);
    for (var n = [], s = 0, i = 0; i < A.length; i++) {
      var o = A[i].stop;
      if (o !== null) {
        var a = iA(o, e);
        a > s ? n.push(a) : n.push(s), (s = a);
      } else n.push(null);
    }
    for (var B = null, i = 0; i < n.length; i++) {
      var l = n[i];
      if (l === null) B === null && (B = i);
      else if (B !== null) {
        for (
          var c = i - B, f = n[B - 1], C = (l - f) / (c + 1), d = 1;
          d <= c;
          d++
        )
          n[B + d - 1] = C * d;
        B = null;
      }
    }
    return A.map(function (Q, _) {
      var E = Q.color;
      return { color: E, stop: Math.max(Math.min(1, n[_] / e), 0) };
    });
  },
  gQ = function (A, e, t) {
    var r = e / 2,
      n = t / 2,
      s = iA(A[0], e) - r,
      i = n - iA(A[1], t);
    return (Math.atan2(i, s) + Math.PI * 2) % (Math.PI * 2);
  },
  wQ = function (A, e, t) {
    var r = typeof A == "number" ? A : gQ(A, e, t),
      n = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)),
      s = e / 2,
      i = t / 2,
      o = n / 2,
      a = Math.sin(r - Math.PI / 2) * o,
      B = Math.cos(r - Math.PI / 2) * o;
    return [n, s - B, s + B, i - a, i + a];
  },
  qA = function (A, e) {
    return Math.sqrt(A * A + e * e);
  },
  wo = function (A, e, t, r, n) {
    var s = [
      [0, 0],
      [0, e],
      [A, 0],
      [A, e],
    ];
    return s.reduce(
      function (i, o) {
        var a = o[0],
          B = o[1],
          l = qA(t - a, r - B);
        return (n ? l < i.optimumDistance : l > i.optimumDistance)
          ? { optimumCorner: o, optimumDistance: l }
          : i;
      },
      { optimumDistance: n ? 1 / 0 : -1 / 0, optimumCorner: null }
    ).optimumCorner;
  },
  QQ = function (A, e, t, r, n) {
    var s = 0,
      i = 0;
    switch (A.size) {
      case 0:
        A.shape === 0
          ? (s = i =
              Math.min(
                Math.abs(e),
                Math.abs(e - r),
                Math.abs(t),
                Math.abs(t - n)
              ))
          : A.shape === 1 &&
            ((s = Math.min(Math.abs(e), Math.abs(e - r))),
            (i = Math.min(Math.abs(t), Math.abs(t - n))));
        break;
      case 2:
        if (A.shape === 0)
          s = i = Math.min(
            qA(e, t),
            qA(e, t - n),
            qA(e - r, t),
            qA(e - r, t - n)
          );
        else if (A.shape === 1) {
          var o =
              Math.min(Math.abs(t), Math.abs(t - n)) /
              Math.min(Math.abs(e), Math.abs(e - r)),
            a = wo(r, n, e, t, !0),
            B = a[0],
            l = a[1];
          (s = qA(B - e, (l - t) / o)), (i = o * s);
        }
        break;
      case 1:
        A.shape === 0
          ? (s = i =
              Math.max(
                Math.abs(e),
                Math.abs(e - r),
                Math.abs(t),
                Math.abs(t - n)
              ))
          : A.shape === 1 &&
            ((s = Math.max(Math.abs(e), Math.abs(e - r))),
            (i = Math.max(Math.abs(t), Math.abs(t - n))));
        break;
      case 3:
        if (A.shape === 0)
          s = i = Math.max(
            qA(e, t),
            qA(e, t - n),
            qA(e - r, t),
            qA(e - r, t - n)
          );
        else if (A.shape === 1) {
          var o =
              Math.max(Math.abs(t), Math.abs(t - n)) /
              Math.max(Math.abs(e), Math.abs(e - r)),
            c = wo(r, n, e, t, !1),
            B = c[0],
            l = c[1];
          (s = qA(B - e, (l - t) / o)), (i = o * s);
        }
        break;
    }
    return (
      Array.isArray(A.size) &&
        ((s = iA(A.size[0], r)),
        (i = A.size.length === 2 ? iA(A.size[1], n) : s)),
      [s, i]
    );
  },
  hQ = function (A, e) {
    var t = JA(180),
      r = [];
    return (
      ge(e).forEach(function (n, s) {
        if (s === 0) {
          var i = n[0];
          if (i.type === 20 && i.value === "to") {
            t = gB(n);
            return;
          } else if (fB(i)) {
            t = dn.parse(A, i);
            return;
          }
        }
        var o = Cn(A, n);
        r.push(o);
      }),
      { angle: t, stops: r, type: 1 }
    );
  },
  mr = function (A, e) {
    var t = JA(180),
      r = [];
    return (
      ge(e).forEach(function (n, s) {
        if (s === 0) {
          var i = n[0];
          if (
            i.type === 20 &&
            ["top", "left", "right", "bottom"].indexOf(i.value) !== -1
          ) {
            t = gB(n);
            return;
          } else if (fB(i)) {
            t = (dn.parse(A, i) + JA(270)) % JA(360);
            return;
          }
        }
        var o = Cn(A, n);
        r.push(o);
      }),
      { angle: t, stops: r, type: 1 }
    );
  },
  dQ = function (A, e) {
    var t = JA(180),
      r = [],
      n = 1,
      s = 0,
      i = 3,
      o = [];
    return (
      ge(e).forEach(function (a, B) {
        var l = a[0];
        if (B === 0) {
          if (nA(l) && l.value === "linear") {
            n = 1;
            return;
          } else if (nA(l) && l.value === "radial") {
            n = 2;
            return;
          }
        }
        if (l.type === 18) {
          if (l.name === "from") {
            var c = De.parse(A, l.values[0]);
            r.push({ stop: EA, color: c });
          } else if (l.name === "to") {
            var c = De.parse(A, l.values[0]);
            r.push({ stop: Ke, color: c });
          } else if (l.name === "color-stop") {
            var f = l.values.filter(Ft);
            if (f.length === 2) {
              var c = De.parse(A, f[1]),
                C = f[0];
              vt(C) &&
                r.push({
                  stop: { type: 16, number: C.number * 100, flags: C.flags },
                  color: c,
                });
            }
          }
        }
      }),
      n === 1
        ? { angle: (t + JA(180)) % JA(360), stops: r, type: n }
        : { size: i, shape: s, stops: r, position: o, type: n }
    );
  },
  wB = "closest-side",
  QB = "farthest-side",
  hB = "closest-corner",
  dB = "farthest-corner",
  CB = "circle",
  UB = "ellipse",
  FB = "cover",
  pB = "contain",
  CQ = function (A, e) {
    var t = 0,
      r = 3,
      n = [],
      s = [];
    return (
      ge(e).forEach(function (i, o) {
        var a = !0;
        if (o === 0) {
          var B = !1;
          a = i.reduce(function (c, f) {
            if (B)
              if (nA(f))
                switch (f.value) {
                  case "center":
                    return s.push(ai), c;
                  case "top":
                  case "left":
                    return s.push(EA), c;
                  case "right":
                  case "bottom":
                    return s.push(Ke), c;
                }
              else (QA(f) || Me(f)) && s.push(f);
            else if (nA(f))
              switch (f.value) {
                case CB:
                  return (t = 0), !1;
                case UB:
                  return (t = 1), !1;
                case "at":
                  return (B = !0), !1;
                case wB:
                  return (r = 0), !1;
                case FB:
                case QB:
                  return (r = 1), !1;
                case pB:
                case hB:
                  return (r = 2), !1;
                case dB:
                  return (r = 3), !1;
              }
            else if (Me(f) || QA(f))
              return Array.isArray(r) || (r = []), r.push(f), !1;
            return c;
          }, a);
        }
        if (a) {
          var l = Cn(A, i);
          n.push(l);
        }
      }),
      { size: r, shape: t, stops: n, position: s, type: 2 }
    );
  },
  Ir = function (A, e) {
    var t = 0,
      r = 3,
      n = [],
      s = [];
    return (
      ge(e).forEach(function (i, o) {
        var a = !0;
        if (
          (o === 0
            ? (a = i.reduce(function (l, c) {
                if (nA(c))
                  switch (c.value) {
                    case "center":
                      return s.push(ai), !1;
                    case "top":
                    case "left":
                      return s.push(EA), !1;
                    case "right":
                    case "bottom":
                      return s.push(Ke), !1;
                  }
                else if (QA(c) || Me(c)) return s.push(c), !1;
                return l;
              }, a))
            : o === 1 &&
              (a = i.reduce(function (l, c) {
                if (nA(c))
                  switch (c.value) {
                    case CB:
                      return (t = 0), !1;
                    case UB:
                      return (t = 1), !1;
                    case pB:
                    case wB:
                      return (r = 0), !1;
                    case QB:
                      return (r = 1), !1;
                    case hB:
                      return (r = 2), !1;
                    case FB:
                    case dB:
                      return (r = 3), !1;
                  }
                else if (Me(c) || QA(c))
                  return Array.isArray(r) || (r = []), r.push(c), !1;
                return l;
              }, a)),
          a)
        ) {
          var B = Cn(A, i);
          n.push(B);
        }
      }),
      { size: r, shape: t, stops: n, position: s, type: 2 }
    );
  },
  UQ = function (A) {
    return A.type === 1;
  },
  FQ = function (A) {
    return A.type === 2;
  },
  Bi = {
    name: "image",
    parse: function (A, e) {
      if (e.type === 22) {
        var t = { url: e.value, type: 0 };
        return A.cache.addImage(e.value), t;
      }
      if (e.type === 18) {
        var r = EB[e.name];
        if (typeof r > "u")
          throw new Error(
            'Attempting to parse an unsupported image function "' + e.name + '"'
          );
        return r(A, e.values);
      }
      throw new Error("Unsupported image type " + e.type);
    },
  };
function pQ(A) {
  return (
    !(A.type === 20 && A.value === "none") && (A.type !== 18 || !!EB[A.name])
  );
}
var EB = {
    "linear-gradient": hQ,
    "-moz-linear-gradient": mr,
    "-ms-linear-gradient": mr,
    "-o-linear-gradient": mr,
    "-webkit-linear-gradient": mr,
    "radial-gradient": CQ,
    "-moz-radial-gradient": Ir,
    "-ms-radial-gradient": Ir,
    "-o-radial-gradient": Ir,
    "-webkit-radial-gradient": Ir,
    "-webkit-gradient": dQ,
  },
  EQ = {
    name: "background-image",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      if (e.length === 0) return [];
      var t = e[0];
      return t.type === 20 && t.value === "none"
        ? []
        : e
            .filter(function (r) {
              return Ft(r) && pQ(r);
            })
            .map(function (r) {
              return Bi.parse(A, r);
            });
    },
  },
  HQ = {
    name: "background-origin",
    initialValue: "border-box",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e.map(function (t) {
        if (nA(t))
          switch (t.value) {
            case "padding-box":
              return 1;
            case "content-box":
              return 2;
          }
        return 0;
      });
    },
  },
  vQ = {
    name: "background-position",
    initialValue: "0% 0%",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      return ge(e)
        .map(function (t) {
          return t.filter(QA);
        })
        .map(aB);
    },
  },
  mQ = {
    name: "background-repeat",
    initialValue: "repeat",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return ge(e)
        .map(function (t) {
          return t
            .filter(nA)
            .map(function (r) {
              return r.value;
            })
            .join(" ");
        })
        .map(IQ);
    },
  },
  IQ = function (A) {
    switch (A) {
      case "no-repeat":
        return 1;
      case "repeat-x":
      case "repeat no-repeat":
        return 2;
      case "repeat-y":
      case "no-repeat repeat":
        return 3;
      case "repeat":
      default:
        return 0;
    }
  },
  Ct;
(function (A) {
  (A.AUTO = "auto"), (A.CONTAIN = "contain"), (A.COVER = "cover");
})(Ct || (Ct = {}));
var yQ = {
    name: "background-size",
    initialValue: "0",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return ge(e).map(function (t) {
        return t.filter(bQ);
      });
    },
  },
  bQ = function (A) {
    return nA(A) || QA(A);
  },
  Un = function (A) {
    return {
      name: "border-" + A + "-color",
      initialValue: "transparent",
      prefix: !1,
      type: 3,
      format: "color",
    };
  },
  KQ = Un("top"),
  xQ = Un("right"),
  LQ = Un("bottom"),
  TQ = Un("left"),
  Fn = function (A) {
    return {
      name: "border-radius-" + A,
      initialValue: "0 0",
      prefix: !1,
      type: 1,
      parse: function (e, t) {
        return aB(t.filter(QA));
      },
    };
  },
  DQ = Fn("top-left"),
  SQ = Fn("top-right"),
  OQ = Fn("bottom-right"),
  _Q = Fn("bottom-left"),
  pn = function (A) {
    return {
      name: "border-" + A + "-style",
      initialValue: "solid",
      prefix: !1,
      type: 2,
      parse: function (e, t) {
        switch (t) {
          case "none":
            return 0;
          case "dashed":
            return 2;
          case "dotted":
            return 3;
          case "double":
            return 4;
        }
        return 1;
      },
    };
  },
  MQ = pn("top"),
  RQ = pn("right"),
  GQ = pn("bottom"),
  VQ = pn("left"),
  En = function (A) {
    return {
      name: "border-" + A + "-width",
      initialValue: "0",
      type: 0,
      prefix: !1,
      parse: function (e, t) {
        return nr(t) ? t.number : 0;
      },
    };
  },
  NQ = En("top"),
  kQ = En("right"),
  PQ = En("bottom"),
  XQ = En("left"),
  JQ = {
    name: "color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color",
  },
  WQ = {
    name: "direction",
    initialValue: "ltr",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "rtl":
          return 1;
        case "ltr":
        default:
          return 0;
      }
    },
  },
  YQ = {
    name: "display",
    initialValue: "inline-block",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e.filter(nA).reduce(function (t, r) {
        return t | ZQ(r.value);
      }, 0);
    },
  },
  ZQ = function (A) {
    switch (A) {
      case "block":
      case "-webkit-box":
        return 2;
      case "inline":
        return 4;
      case "run-in":
        return 8;
      case "flow":
        return 16;
      case "flow-root":
        return 32;
      case "table":
        return 64;
      case "flex":
      case "-webkit-flex":
        return 128;
      case "grid":
      case "-ms-grid":
        return 256;
      case "ruby":
        return 512;
      case "subgrid":
        return 1024;
      case "list-item":
        return 2048;
      case "table-row-group":
        return 4096;
      case "table-header-group":
        return 8192;
      case "table-footer-group":
        return 16384;
      case "table-row":
        return 32768;
      case "table-cell":
        return 65536;
      case "table-column-group":
        return 131072;
      case "table-column":
        return 262144;
      case "table-caption":
        return 524288;
      case "ruby-base":
        return 1048576;
      case "ruby-text":
        return 2097152;
      case "ruby-base-container":
        return 4194304;
      case "ruby-text-container":
        return 8388608;
      case "contents":
        return 16777216;
      case "inline-block":
        return 33554432;
      case "inline-list-item":
        return 67108864;
      case "inline-table":
        return 134217728;
      case "inline-flex":
        return 268435456;
      case "inline-grid":
        return 536870912;
    }
    return 0;
  },
  jQ = {
    name: "float",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "left":
          return 1;
        case "right":
          return 2;
        case "inline-start":
          return 3;
        case "inline-end":
          return 4;
      }
      return 0;
    },
  },
  zQ = {
    name: "letter-spacing",
    initialValue: "0",
    prefix: !1,
    type: 0,
    parse: function (A, e) {
      return e.type === 20 && e.value === "normal"
        ? 0
        : e.type === 17 || e.type === 15
        ? e.number
        : 0;
    },
  },
  Zr;
(function (A) {
  (A.NORMAL = "normal"), (A.STRICT = "strict");
})(Zr || (Zr = {}));
var qQ = {
    name: "line-break",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "strict":
          return Zr.STRICT;
        case "normal":
        default:
          return Zr.NORMAL;
      }
    },
  },
  $Q = { name: "line-height", initialValue: "normal", prefix: !1, type: 4 },
  Qo = function (A, e) {
    return nA(A) && A.value === "normal"
      ? 1.2 * e
      : A.type === 17
      ? e * A.number
      : QA(A)
      ? iA(A, e)
      : e;
  },
  Ah = {
    name: "list-style-image",
    initialValue: "none",
    type: 0,
    prefix: !1,
    parse: function (A, e) {
      return e.type === 20 && e.value === "none" ? null : Bi.parse(A, e);
    },
  },
  eh = {
    name: "list-style-position",
    initialValue: "outside",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "inside":
          return 0;
        case "outside":
        default:
          return 1;
      }
    },
  },
  Ts = {
    name: "list-style-type",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "disc":
          return 0;
        case "circle":
          return 1;
        case "square":
          return 2;
        case "decimal":
          return 3;
        case "cjk-decimal":
          return 4;
        case "decimal-leading-zero":
          return 5;
        case "lower-roman":
          return 6;
        case "upper-roman":
          return 7;
        case "lower-greek":
          return 8;
        case "lower-alpha":
          return 9;
        case "upper-alpha":
          return 10;
        case "arabic-indic":
          return 11;
        case "armenian":
          return 12;
        case "bengali":
          return 13;
        case "cambodian":
          return 14;
        case "cjk-earthly-branch":
          return 15;
        case "cjk-heavenly-stem":
          return 16;
        case "cjk-ideographic":
          return 17;
        case "devanagari":
          return 18;
        case "ethiopic-numeric":
          return 19;
        case "georgian":
          return 20;
        case "gujarati":
          return 21;
        case "gurmukhi":
          return 22;
        case "hebrew":
          return 22;
        case "hiragana":
          return 23;
        case "hiragana-iroha":
          return 24;
        case "japanese-formal":
          return 25;
        case "japanese-informal":
          return 26;
        case "kannada":
          return 27;
        case "katakana":
          return 28;
        case "katakana-iroha":
          return 29;
        case "khmer":
          return 30;
        case "korean-hangul-formal":
          return 31;
        case "korean-hanja-formal":
          return 32;
        case "korean-hanja-informal":
          return 33;
        case "lao":
          return 34;
        case "lower-armenian":
          return 35;
        case "malayalam":
          return 36;
        case "mongolian":
          return 37;
        case "myanmar":
          return 38;
        case "oriya":
          return 39;
        case "persian":
          return 40;
        case "simp-chinese-formal":
          return 41;
        case "simp-chinese-informal":
          return 42;
        case "tamil":
          return 43;
        case "telugu":
          return 44;
        case "thai":
          return 45;
        case "tibetan":
          return 46;
        case "trad-chinese-formal":
          return 47;
        case "trad-chinese-informal":
          return 48;
        case "upper-armenian":
          return 49;
        case "disclosure-open":
          return 50;
        case "disclosure-closed":
          return 51;
        case "none":
        default:
          return -1;
      }
    },
  },
  Hn = function (A) {
    return { name: "margin-" + A, initialValue: "0", prefix: !1, type: 4 };
  },
  th = Hn("top"),
  rh = Hn("right"),
  nh = Hn("bottom"),
  sh = Hn("left"),
  ih = {
    name: "overflow",
    initialValue: "visible",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e.filter(nA).map(function (t) {
        switch (t.value) {
          case "hidden":
            return 1;
          case "scroll":
            return 2;
          case "clip":
            return 3;
          case "auto":
            return 4;
          case "visible":
          default:
            return 0;
        }
      });
    },
  },
  oh = {
    name: "overflow-wrap",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "break-word":
          return "break-word";
        case "normal":
        default:
          return "normal";
      }
    },
  },
  vn = function (A) {
    return {
      name: "padding-" + A,
      initialValue: "0",
      prefix: !1,
      type: 3,
      format: "length-percentage",
    };
  },
  ah = vn("top"),
  Bh = vn("right"),
  lh = vn("bottom"),
  ch = vn("left"),
  uh = {
    name: "text-align",
    initialValue: "left",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "right":
          return 2;
        case "center":
        case "justify":
          return 1;
        case "left":
        default:
          return 0;
      }
    },
  },
  fh = {
    name: "position",
    initialValue: "static",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "relative":
          return 1;
        case "absolute":
          return 2;
        case "fixed":
          return 3;
        case "sticky":
          return 4;
      }
      return 0;
    },
  },
  gh = {
    name: "text-shadow",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      return e.length === 1 && Ls(e[0], "none")
        ? []
        : ge(e).map(function (t) {
            for (
              var r = {
                  color: Ue.TRANSPARENT,
                  offsetX: EA,
                  offsetY: EA,
                  blur: EA,
                },
                n = 0,
                s = 0;
              s < t.length;
              s++
            ) {
              var i = t[s];
              Me(i)
                ? (n === 0
                    ? (r.offsetX = i)
                    : n === 1
                    ? (r.offsetY = i)
                    : (r.blur = i),
                  n++)
                : (r.color = De.parse(A, i));
            }
            return r;
          });
    },
  },
  wh = {
    name: "text-transform",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "uppercase":
          return 2;
        case "lowercase":
          return 1;
        case "capitalize":
          return 3;
      }
      return 0;
    },
  },
  Qh = {
    name: "transform",
    initialValue: "none",
    prefix: !0,
    type: 0,
    parse: function (A, e) {
      if (e.type === 20 && e.value === "none") return null;
      if (e.type === 18) {
        var t = Ch[e.name];
        if (typeof t > "u")
          throw new Error(
            'Attempting to parse an unsupported transform function "' +
              e.name +
              '"'
          );
        return t(e.values);
      }
      return null;
    },
  },
  hh = function (A) {
    var e = A.filter(function (t) {
      return t.type === 17;
    }).map(function (t) {
      return t.number;
    });
    return e.length === 6 ? e : null;
  },
  dh = function (A) {
    var e = A.filter(function (a) {
        return a.type === 17;
      }).map(function (a) {
        return a.number;
      }),
      t = e[0],
      r = e[1];
    e[2], e[3];
    var n = e[4],
      s = e[5];
    e[6], e[7], e[8], e[9], e[10], e[11];
    var i = e[12],
      o = e[13];
    return e[14], e[15], e.length === 16 ? [t, r, n, s, i, o] : null;
  },
  Ch = { matrix: hh, matrix3d: dh },
  ho = { type: 16, number: 50, flags: rr },
  Uh = [ho, ho],
  Fh = {
    name: "transform-origin",
    initialValue: "50% 50%",
    prefix: !0,
    type: 1,
    parse: function (A, e) {
      var t = e.filter(QA);
      return t.length !== 2 ? Uh : [t[0], t[1]];
    },
  },
  ph = {
    name: "visible",
    initialValue: "none",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "hidden":
          return 1;
        case "collapse":
          return 2;
        case "visible":
        default:
          return 0;
      }
    },
  },
  Xt;
(function (A) {
  (A.NORMAL = "normal"), (A.BREAK_ALL = "break-all"), (A.KEEP_ALL = "keep-all");
})(Xt || (Xt = {}));
var Eh = {
    name: "word-break",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "break-all":
          return Xt.BREAK_ALL;
        case "keep-all":
          return Xt.KEEP_ALL;
        case "normal":
        default:
          return Xt.NORMAL;
      }
    },
  },
  Hh = {
    name: "z-index",
    initialValue: "auto",
    prefix: !1,
    type: 0,
    parse: function (A, e) {
      if (e.type === 20) return { auto: !0, order: 0 };
      if (vt(e)) return { auto: !1, order: e.number };
      throw new Error("Invalid z-index number parsed");
    },
  },
  HB = {
    name: "time",
    parse: function (A, e) {
      if (e.type === 15)
        switch (e.unit.toLowerCase()) {
          case "s":
            return 1e3 * e.number;
          case "ms":
            return e.number;
        }
      throw new Error("Unsupported time type");
    },
  },
  vh = {
    name: "opacity",
    initialValue: "1",
    type: 0,
    prefix: !1,
    parse: function (A, e) {
      return vt(e) ? e.number : 1;
    },
  },
  mh = {
    name: "text-decoration-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color",
  },
  Ih = {
    name: "text-decoration-line",
    initialValue: "none",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e
        .filter(nA)
        .map(function (t) {
          switch (t.value) {
            case "underline":
              return 1;
            case "overline":
              return 2;
            case "line-through":
              return 3;
            case "none":
              return 4;
          }
          return 0;
        })
        .filter(function (t) {
          return t !== 0;
        });
    },
  },
  yh = {
    name: "font-family",
    initialValue: "",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      var t = [],
        r = [];
      return (
        e.forEach(function (n) {
          switch (n.type) {
            case 20:
            case 0:
              t.push(n.value);
              break;
            case 17:
              t.push(n.number.toString());
              break;
            case 4:
              r.push(t.join(" ")), (t.length = 0);
              break;
          }
        }),
        t.length && r.push(t.join(" ")),
        r.map(function (n) {
          return n.indexOf(" ") === -1 ? n : "'" + n + "'";
        })
      );
    },
  },
  bh = {
    name: "font-size",
    initialValue: "0",
    prefix: !1,
    type: 3,
    format: "length",
  },
  Kh = {
    name: "font-weight",
    initialValue: "normal",
    type: 0,
    prefix: !1,
    parse: function (A, e) {
      if (vt(e)) return e.number;
      if (nA(e))
        switch (e.value) {
          case "bold":
            return 700;
          case "normal":
          default:
            return 400;
        }
      return 400;
    },
  },
  xh = {
    name: "font-variant",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      return e.filter(nA).map(function (t) {
        return t.value;
      });
    },
  },
  Lh = {
    name: "font-style",
    initialValue: "normal",
    prefix: !1,
    type: 2,
    parse: function (A, e) {
      switch (e) {
        case "oblique":
          return "oblique";
        case "italic":
          return "italic";
        case "normal":
        default:
          return "normal";
      }
    },
  },
  hA = function (A, e) {
    return (A & e) !== 0;
  },
  Th = {
    name: "content",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      if (e.length === 0) return [];
      var t = e[0];
      return t.type === 20 && t.value === "none" ? [] : e;
    },
  },
  Dh = {
    name: "counter-increment",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function (A, e) {
      if (e.length === 0) return null;
      var t = e[0];
      if (t.type === 20 && t.value === "none") return null;
      for (var r = [], n = e.filter(oB), s = 0; s < n.length; s++) {
        var i = n[s],
          o = n[s + 1];
        if (i.type === 20) {
          var a = o && vt(o) ? o.number : 1;
          r.push({ counter: i.value, increment: a });
        }
      }
      return r;
    },
  },
  Sh = {
    name: "counter-reset",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function (A, e) {
      if (e.length === 0) return [];
      for (var t = [], r = e.filter(oB), n = 0; n < r.length; n++) {
        var s = r[n],
          i = r[n + 1];
        if (nA(s) && s.value !== "none") {
          var o = i && vt(i) ? i.number : 0;
          t.push({ counter: s.value, reset: o });
        }
      }
      return t;
    },
  },
  Oh = {
    name: "duration",
    initialValue: "0s",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      return e.filter(nr).map(function (t) {
        return HB.parse(A, t);
      });
    },
  },
  _h = {
    name: "quotes",
    initialValue: "none",
    prefix: !0,
    type: 1,
    parse: function (A, e) {
      if (e.length === 0) return null;
      var t = e[0];
      if (t.type === 20 && t.value === "none") return null;
      var r = [],
        n = e.filter(BQ);
      if (n.length % 2 !== 0) return null;
      for (var s = 0; s < n.length; s += 2) {
        var i = n[s].value,
          o = n[s + 1].value;
        r.push({ open: i, close: o });
      }
      return r;
    },
  },
  Co = function (A, e, t) {
    if (!A) return "";
    var r = A[Math.min(e, A.length - 1)];
    return r ? (t ? r.open : r.close) : "";
  },
  Mh = {
    name: "box-shadow",
    initialValue: "none",
    type: 1,
    prefix: !1,
    parse: function (A, e) {
      return e.length === 1 && Ls(e[0], "none")
        ? []
        : ge(e).map(function (t) {
            for (
              var r = {
                  color: 255,
                  offsetX: EA,
                  offsetY: EA,
                  blur: EA,
                  spread: EA,
                  inset: !1,
                },
                n = 0,
                s = 0;
              s < t.length;
              s++
            ) {
              var i = t[s];
              Ls(i, "inset")
                ? (r.inset = !0)
                : Me(i)
                ? (n === 0
                    ? (r.offsetX = i)
                    : n === 1
                    ? (r.offsetY = i)
                    : n === 2
                    ? (r.blur = i)
                    : (r.spread = i),
                  n++)
                : (r.color = De.parse(A, i));
            }
            return r;
          });
    },
  },
  Rh = {
    name: "paint-order",
    initialValue: "normal",
    prefix: !1,
    type: 1,
    parse: function (A, e) {
      var t = [0, 1, 2],
        r = [];
      return (
        e.filter(nA).forEach(function (n) {
          switch (n.value) {
            case "stroke":
              r.push(1);
              break;
            case "fill":
              r.push(0);
              break;
            case "markers":
              r.push(2);
              break;
          }
        }),
        t.forEach(function (n) {
          r.indexOf(n) === -1 && r.push(n);
        }),
        r
      );
    },
  },
  Gh = {
    name: "-webkit-text-stroke-color",
    initialValue: "currentcolor",
    prefix: !1,
    type: 3,
    format: "color",
  },
  Vh = {
    name: "-webkit-text-stroke-width",
    initialValue: "0",
    type: 0,
    prefix: !1,
    parse: function (A, e) {
      return nr(e) ? e.number : 0;
    },
  },
  Nh = (function () {
    function A(e, t) {
      var r, n;
      (this.animationDuration = T(e, Oh, t.animationDuration)),
        (this.backgroundClip = T(e, uQ, t.backgroundClip)),
        (this.backgroundColor = T(e, fQ, t.backgroundColor)),
        (this.backgroundImage = T(e, EQ, t.backgroundImage)),
        (this.backgroundOrigin = T(e, HQ, t.backgroundOrigin)),
        (this.backgroundPosition = T(e, vQ, t.backgroundPosition)),
        (this.backgroundRepeat = T(e, mQ, t.backgroundRepeat)),
        (this.backgroundSize = T(e, yQ, t.backgroundSize)),
        (this.borderTopColor = T(e, KQ, t.borderTopColor)),
        (this.borderRightColor = T(e, xQ, t.borderRightColor)),
        (this.borderBottomColor = T(e, LQ, t.borderBottomColor)),
        (this.borderLeftColor = T(e, TQ, t.borderLeftColor)),
        (this.borderTopLeftRadius = T(e, DQ, t.borderTopLeftRadius)),
        (this.borderTopRightRadius = T(e, SQ, t.borderTopRightRadius)),
        (this.borderBottomRightRadius = T(e, OQ, t.borderBottomRightRadius)),
        (this.borderBottomLeftRadius = T(e, _Q, t.borderBottomLeftRadius)),
        (this.borderTopStyle = T(e, MQ, t.borderTopStyle)),
        (this.borderRightStyle = T(e, RQ, t.borderRightStyle)),
        (this.borderBottomStyle = T(e, GQ, t.borderBottomStyle)),
        (this.borderLeftStyle = T(e, VQ, t.borderLeftStyle)),
        (this.borderTopWidth = T(e, NQ, t.borderTopWidth)),
        (this.borderRightWidth = T(e, kQ, t.borderRightWidth)),
        (this.borderBottomWidth = T(e, PQ, t.borderBottomWidth)),
        (this.borderLeftWidth = T(e, XQ, t.borderLeftWidth)),
        (this.boxShadow = T(e, Mh, t.boxShadow)),
        (this.color = T(e, JQ, t.color)),
        (this.direction = T(e, WQ, t.direction)),
        (this.display = T(e, YQ, t.display)),
        (this.float = T(e, jQ, t.cssFloat)),
        (this.fontFamily = T(e, yh, t.fontFamily)),
        (this.fontSize = T(e, bh, t.fontSize)),
        (this.fontStyle = T(e, Lh, t.fontStyle)),
        (this.fontVariant = T(e, xh, t.fontVariant)),
        (this.fontWeight = T(e, Kh, t.fontWeight)),
        (this.letterSpacing = T(e, zQ, t.letterSpacing)),
        (this.lineBreak = T(e, qQ, t.lineBreak)),
        (this.lineHeight = T(e, $Q, t.lineHeight)),
        (this.listStyleImage = T(e, Ah, t.listStyleImage)),
        (this.listStylePosition = T(e, eh, t.listStylePosition)),
        (this.listStyleType = T(e, Ts, t.listStyleType)),
        (this.marginTop = T(e, th, t.marginTop)),
        (this.marginRight = T(e, rh, t.marginRight)),
        (this.marginBottom = T(e, nh, t.marginBottom)),
        (this.marginLeft = T(e, sh, t.marginLeft)),
        (this.opacity = T(e, vh, t.opacity));
      var s = T(e, ih, t.overflow);
      (this.overflowX = s[0]),
        (this.overflowY = s[s.length > 1 ? 1 : 0]),
        (this.overflowWrap = T(e, oh, t.overflowWrap)),
        (this.paddingTop = T(e, ah, t.paddingTop)),
        (this.paddingRight = T(e, Bh, t.paddingRight)),
        (this.paddingBottom = T(e, lh, t.paddingBottom)),
        (this.paddingLeft = T(e, ch, t.paddingLeft)),
        (this.paintOrder = T(e, Rh, t.paintOrder)),
        (this.position = T(e, fh, t.position)),
        (this.textAlign = T(e, uh, t.textAlign)),
        (this.textDecorationColor = T(
          e,
          mh,
          (r = t.textDecorationColor) !== null && r !== void 0 ? r : t.color
        )),
        (this.textDecorationLine = T(
          e,
          Ih,
          (n = t.textDecorationLine) !== null && n !== void 0
            ? n
            : t.textDecoration
        )),
        (this.textShadow = T(e, gh, t.textShadow)),
        (this.textTransform = T(e, wh, t.textTransform)),
        (this.transform = T(e, Qh, t.transform)),
        (this.transformOrigin = T(e, Fh, t.transformOrigin)),
        (this.visibility = T(e, ph, t.visibility)),
        (this.webkitTextStrokeColor = T(e, Gh, t.webkitTextStrokeColor)),
        (this.webkitTextStrokeWidth = T(e, Vh, t.webkitTextStrokeWidth)),
        (this.wordBreak = T(e, Eh, t.wordBreak)),
        (this.zIndex = T(e, Hh, t.zIndex));
    }
    return (
      (A.prototype.isVisible = function () {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0;
      }),
      (A.prototype.isTransparent = function () {
        return Se(this.backgroundColor);
      }),
      (A.prototype.isTransformed = function () {
        return this.transform !== null;
      }),
      (A.prototype.isPositioned = function () {
        return this.position !== 0;
      }),
      (A.prototype.isPositionedWithZIndex = function () {
        return this.isPositioned() && !this.zIndex.auto;
      }),
      (A.prototype.isFloating = function () {
        return this.float !== 0;
      }),
      (A.prototype.isInlineLevel = function () {
        return (
          hA(this.display, 4) ||
          hA(this.display, 33554432) ||
          hA(this.display, 268435456) ||
          hA(this.display, 536870912) ||
          hA(this.display, 67108864) ||
          hA(this.display, 134217728)
        );
      }),
      A
    );
  })(),
  kh = (function () {
    function A(e, t) {
      (this.content = T(e, Th, t.content)), (this.quotes = T(e, _h, t.quotes));
    }
    return A;
  })(),
  Uo = (function () {
    function A(e, t) {
      (this.counterIncrement = T(e, Dh, t.counterIncrement)),
        (this.counterReset = T(e, Sh, t.counterReset));
    }
    return A;
  })(),
  T = function (A, e, t) {
    var r = new sB(),
      n = t !== null && typeof t < "u" ? t.toString() : e.initialValue;
    r.write(n);
    var s = new iB(r.read());
    switch (e.type) {
      case 2:
        var i = s.parseComponentValue();
        return e.parse(A, nA(i) ? i.value : e.initialValue);
      case 0:
        return e.parse(A, s.parseComponentValue());
      case 1:
        return e.parse(A, s.parseComponentValues());
      case 4:
        return s.parseComponentValue();
      case 3:
        switch (e.format) {
          case "angle":
            return dn.parse(A, s.parseComponentValue());
          case "color":
            return De.parse(A, s.parseComponentValue());
          case "image":
            return Bi.parse(A, s.parseComponentValue());
          case "length":
            var o = s.parseComponentValue();
            return Me(o) ? o : EA;
          case "length-percentage":
            var a = s.parseComponentValue();
            return QA(a) ? a : EA;
          case "time":
            return HB.parse(A, s.parseComponentValue());
        }
        break;
    }
  },
  Ph = "data-html2canvas-debug",
  Xh = function (A) {
    var e = A.getAttribute(Ph);
    switch (e) {
      case "all":
        return 1;
      case "clone":
        return 2;
      case "parse":
        return 3;
      case "render":
        return 4;
      default:
        return 0;
    }
  },
  Ds = function (A, e) {
    var t = Xh(A);
    return t === 1 || e === t;
  },
  we = (function () {
    function A(e, t) {
      if (
        ((this.context = e),
        (this.textNodes = []),
        (this.elements = []),
        (this.flags = 0),
        Ds(t, 3))
      )
        debugger;
      (this.styles = new Nh(e, window.getComputedStyle(t, null))),
        _s(t) &&
          (this.styles.animationDuration.some(function (r) {
            return r > 0;
          }) && (t.style.animationDuration = "0s"),
          this.styles.transform !== null && (t.style.transform = "none")),
        (this.bounds = Qn(this.context, t)),
        Ds(t, 4) && (this.flags |= 16);
    }
    return A;
  })(),
  Jh =
    "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=",
  Fo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Rt = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var yr = 0; yr < Fo.length; yr++) Rt[Fo.charCodeAt(yr)] = yr;
var Wh = function (A) {
    var e = A.length * 0.75,
      t = A.length,
      r,
      n = 0,
      s,
      i,
      o,
      a;
    A[A.length - 1] === "=" && (e--, A[A.length - 2] === "=" && e--);
    var B =
        typeof ArrayBuffer < "u" &&
        typeof Uint8Array < "u" &&
        typeof Uint8Array.prototype.slice < "u"
          ? new ArrayBuffer(e)
          : new Array(e),
      l = Array.isArray(B) ? B : new Uint8Array(B);
    for (r = 0; r < t; r += 4)
      (s = Rt[A.charCodeAt(r)]),
        (i = Rt[A.charCodeAt(r + 1)]),
        (o = Rt[A.charCodeAt(r + 2)]),
        (a = Rt[A.charCodeAt(r + 3)]),
        (l[n++] = (s << 2) | (i >> 4)),
        (l[n++] = ((i & 15) << 4) | (o >> 2)),
        (l[n++] = ((o & 3) << 6) | (a & 63));
    return B;
  },
  Yh = function (A) {
    for (var e = A.length, t = [], r = 0; r < e; r += 2)
      t.push((A[r + 1] << 8) | A[r]);
    return t;
  },
  Zh = function (A) {
    for (var e = A.length, t = [], r = 0; r < e; r += 4)
      t.push((A[r + 3] << 24) | (A[r + 2] << 16) | (A[r + 1] << 8) | A[r]);
    return t;
  },
  $e = 5,
  li = 6 + 5,
  Pn = 2,
  jh = li - $e,
  vB = 65536 >> $e,
  zh = 1 << $e,
  Xn = zh - 1,
  qh = 1024 >> $e,
  $h = vB + qh,
  Ad = $h,
  ed = 32,
  td = Ad + ed,
  rd = 65536 >> li,
  nd = 1 << jh,
  sd = nd - 1,
  po = function (A, e, t) {
    return A.slice
      ? A.slice(e, t)
      : new Uint16Array(Array.prototype.slice.call(A, e, t));
  },
  id = function (A, e, t) {
    return A.slice
      ? A.slice(e, t)
      : new Uint32Array(Array.prototype.slice.call(A, e, t));
  },
  od = function (A, e) {
    var t = Wh(A),
      r = Array.isArray(t) ? Zh(t) : new Uint32Array(t),
      n = Array.isArray(t) ? Yh(t) : new Uint16Array(t),
      s = 24,
      i = po(n, s / 2, r[4] / 2),
      o = r[5] === 2 ? po(n, (s + r[4]) / 2) : id(r, Math.ceil((s + r[4]) / 4));
    return new ad(r[0], r[1], r[2], r[3], i, o);
  },
  ad = (function () {
    function A(e, t, r, n, s, i) {
      (this.initialValue = e),
        (this.errorValue = t),
        (this.highStart = r),
        (this.highValueIndex = n),
        (this.index = s),
        (this.data = i);
    }
    return (
      (A.prototype.get = function (e) {
        var t;
        if (e >= 0) {
          if (e < 55296 || (e > 56319 && e <= 65535))
            return (
              (t = this.index[e >> $e]),
              (t = (t << Pn) + (e & Xn)),
              this.data[t]
            );
          if (e <= 65535)
            return (
              (t = this.index[vB + ((e - 55296) >> $e)]),
              (t = (t << Pn) + (e & Xn)),
              this.data[t]
            );
          if (e < this.highStart)
            return (
              (t = td - rd + (e >> li)),
              (t = this.index[t]),
              (t += (e >> $e) & sd),
              (t = this.index[t]),
              (t = (t << Pn) + (e & Xn)),
              this.data[t]
            );
          if (e <= 1114111) return this.data[this.highValueIndex];
        }
        return this.errorValue;
      }),
      A
    );
  })(),
  Eo = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
  Bd = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var br = 0; br < Eo.length; br++) Bd[Eo.charCodeAt(br)] = br;
var ld = 1,
  Jn = 2,
  Wn = 3,
  Ho = 4,
  vo = 5,
  cd = 7,
  mo = 8,
  Yn = 9,
  Zn = 10,
  Io = 11,
  yo = 12,
  bo = 13,
  Ko = 14,
  jn = 15,
  ud = function (A) {
    for (var e = [], t = 0, r = A.length; t < r; ) {
      var n = A.charCodeAt(t++);
      if (n >= 55296 && n <= 56319 && t < r) {
        var s = A.charCodeAt(t++);
        (s & 64512) === 56320
          ? e.push(((n & 1023) << 10) + (s & 1023) + 65536)
          : (e.push(n), t--);
      } else e.push(n);
    }
    return e;
  },
  fd = function () {
    for (var A = [], e = 0; e < arguments.length; e++) A[e] = arguments[e];
    if (String.fromCodePoint) return String.fromCodePoint.apply(String, A);
    var t = A.length;
    if (!t) return "";
    for (var r = [], n = -1, s = ""; ++n < t; ) {
      var i = A[n];
      i <= 65535
        ? r.push(i)
        : ((i -= 65536), r.push((i >> 10) + 55296, (i % 1024) + 56320)),
        (n + 1 === t || r.length > 16384) &&
          ((s += String.fromCharCode.apply(String, r)), (r.length = 0));
    }
    return s;
  },
  gd = od(Jh),
  kA = "×",
  zn = "÷",
  wd = function (A) {
    return gd.get(A);
  },
  Qd = function (A, e, t) {
    var r = t - 2,
      n = e[r],
      s = e[t - 1],
      i = e[t];
    if (s === Jn && i === Wn) return kA;
    if (s === Jn || s === Wn || s === Ho || i === Jn || i === Wn || i === Ho)
      return zn;
    if (
      (s === mo && [mo, Yn, Io, yo].indexOf(i) !== -1) ||
      ((s === Io || s === Yn) && (i === Yn || i === Zn)) ||
      ((s === yo || s === Zn) && i === Zn) ||
      i === bo ||
      i === vo ||
      i === cd ||
      s === ld
    )
      return kA;
    if (s === bo && i === Ko) {
      for (; n === vo; ) n = e[--r];
      if (n === Ko) return kA;
    }
    if (s === jn && i === jn) {
      for (var o = 0; n === jn; ) o++, (n = e[--r]);
      if (o % 2 === 0) return kA;
    }
    return zn;
  },
  hd = function (A) {
    var e = ud(A),
      t = e.length,
      r = 0,
      n = 0,
      s = e.map(wd);
    return {
      next: function () {
        if (r >= t) return { done: !0, value: null };
        for (var i = kA; r < t && (i = Qd(e, s, ++r)) === kA; );
        if (i !== kA || r === t) {
          var o = fd.apply(null, e.slice(n, r));
          return (n = r), { value: o, done: !1 };
        }
        return { done: !0, value: null };
      },
    };
  },
  dd = function (A) {
    for (var e = hd(A), t = [], r; !(r = e.next()).done; )
      r.value && t.push(r.value.slice());
    return t;
  },
  Cd = function (A) {
    var e = 123;
    if (A.createRange) {
      var t = A.createRange();
      if (t.getBoundingClientRect) {
        var r = A.createElement("boundtest");
        (r.style.height = e + "px"),
          (r.style.display = "block"),
          A.body.appendChild(r),
          t.selectNode(r);
        var n = t.getBoundingClientRect(),
          s = Math.round(n.height);
        if ((A.body.removeChild(r), s === e)) return !0;
      }
    }
    return !1;
  },
  Ud = function (A) {
    var e = A.createElement("boundtest");
    (e.style.width = "50px"),
      (e.style.display = "block"),
      (e.style.fontSize = "12px"),
      (e.style.letterSpacing = "0px"),
      (e.style.wordSpacing = "0px"),
      A.body.appendChild(e);
    var t = A.createRange();
    e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
    var r = e.firstChild,
      n = hn(r.data).map(function (a) {
        return fA(a);
      }),
      s = 0,
      i = {},
      o = n.every(function (a, B) {
        t.setStart(r, s), t.setEnd(r, s + a.length);
        var l = t.getBoundingClientRect();
        s += a.length;
        var c = l.x > i.x || l.y > i.y;
        return (i = l), B === 0 ? !0 : c;
      });
    return A.body.removeChild(e), o;
  },
  Fd = function () {
    return typeof new Image().crossOrigin < "u";
  },
  pd = function () {
    return typeof new XMLHttpRequest().responseType == "string";
  },
  Ed = function (A) {
    var e = new Image(),
      t = A.createElement("canvas"),
      r = t.getContext("2d");
    if (!r) return !1;
    e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
      r.drawImage(e, 0, 0), t.toDataURL();
    } catch {
      return !1;
    }
    return !0;
  },
  xo = function (A) {
    return A[0] === 0 && A[1] === 255 && A[2] === 0 && A[3] === 255;
  },
  Hd = function (A) {
    var e = A.createElement("canvas"),
      t = 100;
    (e.width = t), (e.height = t);
    var r = e.getContext("2d");
    if (!r) return Promise.reject(!1);
    (r.fillStyle = "rgb(0, 255, 0)"), r.fillRect(0, 0, t, t);
    var n = new Image(),
      s = e.toDataURL();
    n.src = s;
    var i = Ss(t, t, 0, 0, n);
    return (
      (r.fillStyle = "red"),
      r.fillRect(0, 0, t, t),
      Lo(i)
        .then(function (o) {
          r.drawImage(o, 0, 0);
          var a = r.getImageData(0, 0, t, t).data;
          (r.fillStyle = "red"), r.fillRect(0, 0, t, t);
          var B = A.createElement("div");
          return (
            (B.style.backgroundImage = "url(" + s + ")"),
            (B.style.height = t + "px"),
            xo(a) ? Lo(Ss(t, t, 0, 0, B)) : Promise.reject(!1)
          );
        })
        .then(function (o) {
          return r.drawImage(o, 0, 0), xo(r.getImageData(0, 0, t, t).data);
        })
        .catch(function () {
          return !1;
        })
    );
  },
  Ss = function (A, e, t, r, n) {
    var s = "http://www.w3.org/2000/svg",
      i = document.createElementNS(s, "svg"),
      o = document.createElementNS(s, "foreignObject");
    return (
      i.setAttributeNS(null, "width", A.toString()),
      i.setAttributeNS(null, "height", e.toString()),
      o.setAttributeNS(null, "width", "100%"),
      o.setAttributeNS(null, "height", "100%"),
      o.setAttributeNS(null, "x", t.toString()),
      o.setAttributeNS(null, "y", r.toString()),
      o.setAttributeNS(null, "externalResourcesRequired", "true"),
      i.appendChild(o),
      o.appendChild(n),
      i
    );
  },
  Lo = function (A) {
    return new Promise(function (e, t) {
      var r = new Image();
      (r.onload = function () {
        return e(r);
      }),
        (r.onerror = t),
        (r.src =
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(new XMLSerializer().serializeToString(A)));
    });
  },
  pA = {
    get SUPPORT_RANGE_BOUNDS() {
      var A = Cd(document);
      return Object.defineProperty(pA, "SUPPORT_RANGE_BOUNDS", { value: A }), A;
    },
    get SUPPORT_WORD_BREAKING() {
      var A = pA.SUPPORT_RANGE_BOUNDS && Ud(document);
      return (
        Object.defineProperty(pA, "SUPPORT_WORD_BREAKING", { value: A }), A
      );
    },
    get SUPPORT_SVG_DRAWING() {
      var A = Ed(document);
      return Object.defineProperty(pA, "SUPPORT_SVG_DRAWING", { value: A }), A;
    },
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
      var A =
        typeof Array.from == "function" && typeof window.fetch == "function"
          ? Hd(document)
          : Promise.resolve(!1);
      return (
        Object.defineProperty(pA, "SUPPORT_FOREIGNOBJECT_DRAWING", {
          value: A,
        }),
        A
      );
    },
    get SUPPORT_CORS_IMAGES() {
      var A = Fd();
      return Object.defineProperty(pA, "SUPPORT_CORS_IMAGES", { value: A }), A;
    },
    get SUPPORT_RESPONSE_TYPE() {
      var A = pd();
      return (
        Object.defineProperty(pA, "SUPPORT_RESPONSE_TYPE", { value: A }), A
      );
    },
    get SUPPORT_CORS_XHR() {
      var A = "withCredentials" in new XMLHttpRequest();
      return Object.defineProperty(pA, "SUPPORT_CORS_XHR", { value: A }), A;
    },
    get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
      var A = !!(typeof Intl < "u" && Intl.Segmenter);
      return (
        Object.defineProperty(pA, "SUPPORT_NATIVE_TEXT_SEGMENTATION", {
          value: A,
        }),
        A
      );
    },
  },
  Jt = (function () {
    function A(e, t) {
      (this.text = e), (this.bounds = t);
    }
    return A;
  })(),
  vd = function (A, e, t, r) {
    var n = yd(e, t),
      s = [],
      i = 0;
    return (
      n.forEach(function (o) {
        if (t.textDecorationLine.length || o.trim().length > 0)
          if (pA.SUPPORT_RANGE_BOUNDS) {
            var a = To(r, i, o.length).getClientRects();
            if (a.length > 1) {
              var B = ci(o),
                l = 0;
              B.forEach(function (f) {
                s.push(
                  new Jt(
                    f,
                    pe.fromDOMRectList(
                      A,
                      To(r, l + i, f.length).getClientRects()
                    )
                  )
                ),
                  (l += f.length);
              });
            } else s.push(new Jt(o, pe.fromDOMRectList(A, a)));
          } else {
            var c = r.splitText(o.length);
            s.push(new Jt(o, md(A, r))), (r = c);
          }
        else pA.SUPPORT_RANGE_BOUNDS || (r = r.splitText(o.length));
        i += o.length;
      }),
      s
    );
  },
  md = function (A, e) {
    var t = e.ownerDocument;
    if (t) {
      var r = t.createElement("html2canvaswrapper");
      r.appendChild(e.cloneNode(!0));
      var n = e.parentNode;
      if (n) {
        n.replaceChild(r, e);
        var s = Qn(A, r);
        return r.firstChild && n.replaceChild(r.firstChild, r), s;
      }
    }
    return pe.EMPTY;
  },
  To = function (A, e, t) {
    var r = A.ownerDocument;
    if (!r) throw new Error("Node has no owner document");
    var n = r.createRange();
    return n.setStart(A, e), n.setEnd(A, e + t), n;
  },
  ci = function (A) {
    if (pA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
      return Array.from(e.segment(A)).map(function (t) {
        return t.segment;
      });
    }
    return dd(A);
  },
  Id = function (A, e) {
    if (pA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
      var t = new Intl.Segmenter(void 0, { granularity: "word" });
      return Array.from(t.segment(A)).map(function (r) {
        return r.segment;
      });
    }
    return Kd(A, e);
  },
  yd = function (A, e) {
    return e.letterSpacing !== 0 ? ci(A) : Id(A, e);
  },
  bd = [32, 160, 4961, 65792, 65793, 4153, 4241],
  Kd = function (A, e) {
    for (
      var t = rw(A, {
          lineBreak: e.lineBreak,
          wordBreak:
            e.overflowWrap === "break-word" ? "break-word" : e.wordBreak,
        }),
        r = [],
        n,
        s = function () {
          if (n.value) {
            var i = n.value.slice(),
              o = hn(i),
              a = "";
            o.forEach(function (B) {
              bd.indexOf(B) === -1
                ? (a += fA(B))
                : (a.length && r.push(a), r.push(fA(B)), (a = ""));
            }),
              a.length && r.push(a);
          }
        };
      !(n = t.next()).done;

    )
      s();
    return r;
  },
  xd = (function () {
    function A(e, t, r) {
      (this.text = Ld(t.data, r.textTransform)),
        (this.textBounds = vd(e, this.text, r, t));
    }
    return A;
  })(),
  Ld = function (A, e) {
    switch (e) {
      case 1:
        return A.toLowerCase();
      case 3:
        return A.replace(Td, Dd);
      case 2:
        return A.toUpperCase();
      default:
        return A;
    }
  },
  Td = /(^|\s|:|-|\(|\))([a-z])/g,
  Dd = function (A, e, t) {
    return A.length > 0 ? e + t.toUpperCase() : A;
  },
  mB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (
        (n.src = r.currentSrc || r.src),
        (n.intrinsicWidth = r.naturalWidth),
        (n.intrinsicHeight = r.naturalHeight),
        n.context.cache.addImage(n.src),
        n
      );
    }
    return e;
  })(we),
  IB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (
        (n.canvas = r),
        (n.intrinsicWidth = r.width),
        (n.intrinsicHeight = r.height),
        n
      );
    }
    return e;
  })(we),
  yB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this,
        s = new XMLSerializer(),
        i = Qn(t, r);
      return (
        r.setAttribute("width", i.width + "px"),
        r.setAttribute("height", i.height + "px"),
        (n.svg =
          "data:image/svg+xml," + encodeURIComponent(s.serializeToString(r))),
        (n.intrinsicWidth = r.width.baseVal.value),
        (n.intrinsicHeight = r.height.baseVal.value),
        n.context.cache.addImage(n.svg),
        n
      );
    }
    return e;
  })(we),
  bB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (n.value = r.value), n;
    }
    return e;
  })(we),
  Os = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (
        (n.start = r.start),
        (n.reversed = typeof r.reversed == "boolean" && r.reversed === !0),
        n
      );
    }
    return e;
  })(we),
  Sd = [{ type: 15, flags: 0, unit: "px", number: 3 }],
  Od = [{ type: 16, flags: 0, number: 50 }],
  _d = function (A) {
    return A.width > A.height
      ? new pe(A.left + (A.width - A.height) / 2, A.top, A.height, A.height)
      : A.width < A.height
      ? new pe(A.left, A.top + (A.height - A.width) / 2, A.width, A.width)
      : A;
  },
  Md = function (A) {
    var e = A.type === Rd ? new Array(A.value.length + 1).join("•") : A.value;
    return e.length === 0 ? A.placeholder || "" : e;
  },
  jr = "checkbox",
  zr = "radio",
  Rd = "password",
  Do = 707406591,
  ui = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      switch (
        ((n.type = r.type.toLowerCase()),
        (n.checked = r.checked),
        (n.value = Md(r)),
        (n.type === jr || n.type === zr) &&
          ((n.styles.backgroundColor = 3739148031),
          (n.styles.borderTopColor =
            n.styles.borderRightColor =
            n.styles.borderBottomColor =
            n.styles.borderLeftColor =
              2779096575),
          (n.styles.borderTopWidth =
            n.styles.borderRightWidth =
            n.styles.borderBottomWidth =
            n.styles.borderLeftWidth =
              1),
          (n.styles.borderTopStyle =
            n.styles.borderRightStyle =
            n.styles.borderBottomStyle =
            n.styles.borderLeftStyle =
              1),
          (n.styles.backgroundClip = [0]),
          (n.styles.backgroundOrigin = [0]),
          (n.bounds = _d(n.bounds))),
        n.type)
      ) {
        case jr:
          n.styles.borderTopRightRadius =
            n.styles.borderTopLeftRadius =
            n.styles.borderBottomRightRadius =
            n.styles.borderBottomLeftRadius =
              Sd;
          break;
        case zr:
          n.styles.borderTopRightRadius =
            n.styles.borderTopLeftRadius =
            n.styles.borderBottomRightRadius =
            n.styles.borderBottomLeftRadius =
              Od;
          break;
      }
      return n;
    }
    return e;
  })(we),
  KB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this,
        s = r.options[r.selectedIndex || 0];
      return (n.value = (s && s.text) || ""), n;
    }
    return e;
  })(we),
  xB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (n.value = r.value), n;
    }
    return e;
  })(we),
  LB = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      (n.src = r.src),
        (n.width = parseInt(r.width, 10) || 0),
        (n.height = parseInt(r.height, 10) || 0),
        (n.backgroundColor = n.styles.backgroundColor);
      try {
        if (
          r.contentWindow &&
          r.contentWindow.document &&
          r.contentWindow.document.documentElement
        ) {
          n.tree = DB(t, r.contentWindow.document.documentElement);
          var s = r.contentWindow.document.documentElement
              ? Pt(
                  t,
                  getComputedStyle(r.contentWindow.document.documentElement)
                    .backgroundColor
                )
              : Ue.TRANSPARENT,
            i = r.contentWindow.document.body
              ? Pt(
                  t,
                  getComputedStyle(r.contentWindow.document.body)
                    .backgroundColor
                )
              : Ue.TRANSPARENT;
          n.backgroundColor = Se(s)
            ? Se(i)
              ? n.styles.backgroundColor
              : i
            : s;
        }
      } catch {}
      return n;
    }
    return e;
  })(we),
  Gd = ["OL", "UL", "MENU"],
  Vr = function (A, e, t, r) {
    for (var n = e.firstChild, s = void 0; n; n = s)
      if (((s = n.nextSibling), SB(n) && n.data.trim().length > 0))
        t.textNodes.push(new xd(A, n, t.styles));
      else if (ft(n))
        if (RB(n) && n.assignedNodes)
          n.assignedNodes().forEach(function (o) {
            return Vr(A, o, t, r);
          });
        else {
          var i = TB(A, n);
          i.styles.isVisible() &&
            (Vd(n, i, r) ? (i.flags |= 4) : Nd(i.styles) && (i.flags |= 2),
            Gd.indexOf(n.tagName) !== -1 && (i.flags |= 8),
            t.elements.push(i),
            n.slot,
            n.shadowRoot
              ? Vr(A, n.shadowRoot, i, r)
              : !qr(n) && !OB(n) && !$r(n) && Vr(A, n, i, r));
        }
  },
  TB = function (A, e) {
    return Ms(e)
      ? new mB(A, e)
      : _B(e)
      ? new IB(A, e)
      : OB(e)
      ? new yB(A, e)
      : kd(e)
      ? new bB(A, e)
      : Pd(e)
      ? new Os(A, e)
      : Xd(e)
      ? new ui(A, e)
      : $r(e)
      ? new KB(A, e)
      : qr(e)
      ? new xB(A, e)
      : MB(e)
      ? new LB(A, e)
      : new we(A, e);
  },
  DB = function (A, e) {
    var t = TB(A, e);
    return (t.flags |= 4), Vr(A, e, t, t), t;
  },
  Vd = function (A, e, t) {
    return (
      e.styles.isPositionedWithZIndex() ||
      e.styles.opacity < 1 ||
      e.styles.isTransformed() ||
      (fi(A) && t.styles.isTransparent())
    );
  },
  Nd = function (A) {
    return A.isPositioned() || A.isFloating();
  },
  SB = function (A) {
    return A.nodeType === Node.TEXT_NODE;
  },
  ft = function (A) {
    return A.nodeType === Node.ELEMENT_NODE;
  },
  _s = function (A) {
    return ft(A) && typeof A.style < "u" && !Nr(A);
  },
  Nr = function (A) {
    return typeof A.className == "object";
  },
  kd = function (A) {
    return A.tagName === "LI";
  },
  Pd = function (A) {
    return A.tagName === "OL";
  },
  Xd = function (A) {
    return A.tagName === "INPUT";
  },
  Jd = function (A) {
    return A.tagName === "HTML";
  },
  OB = function (A) {
    return A.tagName === "svg";
  },
  fi = function (A) {
    return A.tagName === "BODY";
  },
  _B = function (A) {
    return A.tagName === "CANVAS";
  },
  So = function (A) {
    return A.tagName === "VIDEO";
  },
  Ms = function (A) {
    return A.tagName === "IMG";
  },
  MB = function (A) {
    return A.tagName === "IFRAME";
  },
  Oo = function (A) {
    return A.tagName === "STYLE";
  },
  Wd = function (A) {
    return A.tagName === "SCRIPT";
  },
  qr = function (A) {
    return A.tagName === "TEXTAREA";
  },
  $r = function (A) {
    return A.tagName === "SELECT";
  },
  RB = function (A) {
    return A.tagName === "SLOT";
  },
  _o = function (A) {
    return A.tagName.indexOf("-") > 0;
  },
  Yd = (function () {
    function A() {
      this.counters = {};
    }
    return (
      (A.prototype.getCounterValue = function (e) {
        var t = this.counters[e];
        return t && t.length ? t[t.length - 1] : 1;
      }),
      (A.prototype.getCounterValues = function (e) {
        var t = this.counters[e];
        return t || [];
      }),
      (A.prototype.pop = function (e) {
        var t = this;
        e.forEach(function (r) {
          return t.counters[r].pop();
        });
      }),
      (A.prototype.parse = function (e) {
        var t = this,
          r = e.counterIncrement,
          n = e.counterReset,
          s = !0;
        r !== null &&
          r.forEach(function (o) {
            var a = t.counters[o.counter];
            a &&
              o.increment !== 0 &&
              ((s = !1),
              a.length || a.push(1),
              (a[Math.max(0, a.length - 1)] += o.increment));
          });
        var i = [];
        return (
          s &&
            n.forEach(function (o) {
              var a = t.counters[o.counter];
              i.push(o.counter),
                a || (a = t.counters[o.counter] = []),
                a.push(o.reset);
            }),
          i
        );
      }),
      A
    );
  })(),
  Mo = {
    integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: [
      "M",
      "CM",
      "D",
      "CD",
      "C",
      "XC",
      "L",
      "XL",
      "X",
      "IX",
      "V",
      "IV",
      "I",
    ],
  },
  Ro = {
    integers: [
      9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500, 400,
      300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2,
      1,
    ],
    values: [
      "Ք",
      "Փ",
      "Ւ",
      "Ց",
      "Ր",
      "Տ",
      "Վ",
      "Ս",
      "Ռ",
      "Ջ",
      "Պ",
      "Չ",
      "Ո",
      "Շ",
      "Ն",
      "Յ",
      "Մ",
      "Ճ",
      "Ղ",
      "Ձ",
      "Հ",
      "Կ",
      "Ծ",
      "Խ",
      "Լ",
      "Ի",
      "Ժ",
      "Թ",
      "Ը",
      "Է",
      "Զ",
      "Ե",
      "Դ",
      "Գ",
      "Բ",
      "Ա",
    ],
  },
  Zd = {
    integers: [
      1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 400, 300, 200, 100, 90,
      80, 70, 60, 50, 40, 30, 20, 19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3,
      2, 1,
    ],
    values: [
      "י׳",
      "ט׳",
      "ח׳",
      "ז׳",
      "ו׳",
      "ה׳",
      "ד׳",
      "ג׳",
      "ב׳",
      "א׳",
      "ת",
      "ש",
      "ר",
      "ק",
      "צ",
      "פ",
      "ע",
      "ס",
      "נ",
      "מ",
      "ל",
      "כ",
      "יט",
      "יח",
      "יז",
      "טז",
      "טו",
      "י",
      "ט",
      "ח",
      "ז",
      "ו",
      "ה",
      "ד",
      "ג",
      "ב",
      "א",
    ],
  },
  jd = {
    integers: [
      1e4, 9e3, 8e3, 7e3, 6e3, 5e3, 4e3, 3e3, 2e3, 1e3, 900, 800, 700, 600, 500,
      400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4,
      3, 2, 1,
    ],
    values: [
      "ჵ",
      "ჰ",
      "ჯ",
      "ჴ",
      "ხ",
      "ჭ",
      "წ",
      "ძ",
      "ც",
      "ჩ",
      "შ",
      "ყ",
      "ღ",
      "ქ",
      "ფ",
      "ჳ",
      "ტ",
      "ს",
      "რ",
      "ჟ",
      "პ",
      "ო",
      "ჲ",
      "ნ",
      "მ",
      "ლ",
      "კ",
      "ი",
      "თ",
      "ჱ",
      "ზ",
      "ვ",
      "ე",
      "დ",
      "გ",
      "ბ",
      "ა",
    ],
  },
  st = function (A, e, t, r, n, s) {
    return A < e || A > t
      ? tr(A, n, s.length > 0)
      : r.integers.reduce(function (i, o, a) {
          for (; A >= o; ) (A -= o), (i += r.values[a]);
          return i;
        }, "") + s;
  },
  GB = function (A, e, t, r) {
    var n = "";
    do t || A--, (n = r(A) + n), (A /= e);
    while (A * e >= e);
    return n;
  },
  uA = function (A, e, t, r, n) {
    var s = t - e + 1;
    return (
      (A < 0 ? "-" : "") +
      (GB(Math.abs(A), s, r, function (i) {
        return fA(Math.floor(i % s) + e);
      }) +
        n)
    );
  },
  Ve = function (A, e, t) {
    t === void 0 && (t = ". ");
    var r = e.length;
    return (
      GB(Math.abs(A), r, !1, function (n) {
        return e[Math.floor(n % r)];
      }) + t
    );
  },
  lt = 1 << 0,
  ve = 1 << 1,
  me = 1 << 2,
  Gt = 1 << 3,
  de = function (A, e, t, r, n, s) {
    if (A < -9999 || A > 9999) return tr(A, 4, n.length > 0);
    var i = Math.abs(A),
      o = n;
    if (i === 0) return e[0] + o;
    for (var a = 0; i > 0 && a <= 4; a++) {
      var B = i % 10;
      B === 0 && hA(s, lt) && o !== ""
        ? (o = e[B] + o)
        : B > 1 ||
          (B === 1 && a === 0) ||
          (B === 1 && a === 1 && hA(s, ve)) ||
          (B === 1 && a === 1 && hA(s, me) && A > 100) ||
          (B === 1 && a > 1 && hA(s, Gt))
        ? (o = e[B] + (a > 0 ? t[a - 1] : "") + o)
        : B === 1 && a > 0 && (o = t[a - 1] + o),
        (i = Math.floor(i / 10));
    }
    return (A < 0 ? r : "") + o;
  },
  Go = "十百千萬",
  Vo = "拾佰仟萬",
  No = "マイナス",
  qn = "마이너스",
  tr = function (A, e, t) {
    var r = t ? ". " : "",
      n = t ? "、" : "",
      s = t ? ", " : "",
      i = t ? " " : "";
    switch (e) {
      case 0:
        return "•" + i;
      case 1:
        return "◦" + i;
      case 2:
        return "◾" + i;
      case 5:
        var o = uA(A, 48, 57, !0, r);
        return o.length < 4 ? "0" + o : o;
      case 4:
        return Ve(A, "〇一二三四五六七八九", n);
      case 6:
        return st(A, 1, 3999, Mo, 3, r).toLowerCase();
      case 7:
        return st(A, 1, 3999, Mo, 3, r);
      case 8:
        return uA(A, 945, 969, !1, r);
      case 9:
        return uA(A, 97, 122, !1, r);
      case 10:
        return uA(A, 65, 90, !1, r);
      case 11:
        return uA(A, 1632, 1641, !0, r);
      case 12:
      case 49:
        return st(A, 1, 9999, Ro, 3, r);
      case 35:
        return st(A, 1, 9999, Ro, 3, r).toLowerCase();
      case 13:
        return uA(A, 2534, 2543, !0, r);
      case 14:
      case 30:
        return uA(A, 6112, 6121, !0, r);
      case 15:
        return Ve(A, "子丑寅卯辰巳午未申酉戌亥", n);
      case 16:
        return Ve(A, "甲乙丙丁戊己庚辛壬癸", n);
      case 17:
      case 48:
        return de(A, "零一二三四五六七八九", Go, "負", n, ve | me | Gt);
      case 47:
        return de(A, "零壹貳參肆伍陸柒捌玖", Vo, "負", n, lt | ve | me | Gt);
      case 42:
        return de(A, "零一二三四五六七八九", Go, "负", n, ve | me | Gt);
      case 41:
        return de(A, "零壹贰叁肆伍陆柒捌玖", Vo, "负", n, lt | ve | me | Gt);
      case 26:
        return de(A, "〇一二三四五六七八九", "十百千万", No, n, 0);
      case 25:
        return de(A, "零壱弐参四伍六七八九", "拾百千万", No, n, lt | ve | me);
      case 31:
        return de(A, "영일이삼사오육칠팔구", "십백천만", qn, s, lt | ve | me);
      case 33:
        return de(A, "零一二三四五六七八九", "十百千萬", qn, s, 0);
      case 32:
        return de(A, "零壹貳參四五六七八九", "拾百千", qn, s, lt | ve | me);
      case 18:
        return uA(A, 2406, 2415, !0, r);
      case 20:
        return st(A, 1, 19999, jd, 3, r);
      case 21:
        return uA(A, 2790, 2799, !0, r);
      case 22:
        return uA(A, 2662, 2671, !0, r);
      case 22:
        return st(A, 1, 10999, Zd, 3, r);
      case 23:
        return Ve(
          A,
          "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん"
        );
      case 24:
        return Ve(
          A,
          "いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす"
        );
      case 27:
        return uA(A, 3302, 3311, !0, r);
      case 28:
        return Ve(
          A,
          "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン",
          n
        );
      case 29:
        return Ve(
          A,
          "イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス",
          n
        );
      case 34:
        return uA(A, 3792, 3801, !0, r);
      case 37:
        return uA(A, 6160, 6169, !0, r);
      case 38:
        return uA(A, 4160, 4169, !0, r);
      case 39:
        return uA(A, 2918, 2927, !0, r);
      case 40:
        return uA(A, 1776, 1785, !0, r);
      case 43:
        return uA(A, 3046, 3055, !0, r);
      case 44:
        return uA(A, 3174, 3183, !0, r);
      case 45:
        return uA(A, 3664, 3673, !0, r);
      case 46:
        return uA(A, 3872, 3881, !0, r);
      case 3:
      default:
        return uA(A, 48, 57, !0, r);
    }
  },
  VB = "data-html2canvas-ignore",
  ko = (function () {
    function A(e, t, r) {
      if (
        ((this.context = e),
        (this.options = r),
        (this.scrolledElements = []),
        (this.referenceElement = t),
        (this.counters = new Yd()),
        (this.quoteDepth = 0),
        !t.ownerDocument)
      )
        throw new Error("Cloned element does not have an owner document");
      this.documentElement = this.cloneNode(
        t.ownerDocument.documentElement,
        !1
      );
    }
    return (
      (A.prototype.toIFrame = function (e, t) {
        var r = this,
          n = zd(e, t);
        if (!n.contentWindow)
          return Promise.reject("Unable to find iframe window");
        var s = e.defaultView.pageXOffset,
          i = e.defaultView.pageYOffset,
          o = n.contentWindow,
          a = o.document,
          B = AC(n).then(function () {
            return xA(r, void 0, void 0, function () {
              var l, c;
              return vA(this, function (f) {
                switch (f.label) {
                  case 0:
                    return (
                      this.scrolledElements.forEach(nC),
                      o &&
                        (o.scrollTo(t.left, t.top),
                        /(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                          (o.scrollY !== t.top || o.scrollX !== t.left) &&
                          (this.context.logger.warn(
                            "Unable to restore scroll position for cloned document"
                          ),
                          (this.context.windowBounds =
                            this.context.windowBounds.add(
                              o.scrollX - t.left,
                              o.scrollY - t.top,
                              0,
                              0
                            )))),
                      (l = this.options.onclone),
                      (c = this.clonedReferenceElement),
                      typeof c > "u"
                        ? [
                            2,
                            Promise.reject(
                              "Error finding the " +
                                this.referenceElement.nodeName +
                                " in the cloned document"
                            ),
                          ]
                        : a.fonts && a.fonts.ready
                        ? [4, a.fonts.ready]
                        : [3, 2]
                    );
                  case 1:
                    f.sent(), (f.label = 2);
                  case 2:
                    return /(AppleWebKit)/g.test(navigator.userAgent)
                      ? [4, $d(a)]
                      : [3, 4];
                  case 3:
                    f.sent(), (f.label = 4);
                  case 4:
                    return typeof l == "function"
                      ? [
                          2,
                          Promise.resolve()
                            .then(function () {
                              return l(a, c);
                            })
                            .then(function () {
                              return n;
                            }),
                        ]
                      : [2, n];
                }
              });
            });
          });
        return (
          a.open(),
          a.write(tC(document.doctype) + "<html></html>"),
          rC(this.referenceElement.ownerDocument, s, i),
          a.replaceChild(a.adoptNode(this.documentElement), a.documentElement),
          a.close(),
          B
        );
      }),
      (A.prototype.createElementClone = function (e) {
        if (Ds(e, 2)) debugger;
        if (_B(e)) return this.createCanvasClone(e);
        if (So(e)) return this.createVideoClone(e);
        if (Oo(e)) return this.createStyleClone(e);
        var t = e.cloneNode(!1);
        return (
          Ms(t) &&
            (Ms(e) &&
              e.currentSrc &&
              e.currentSrc !== e.src &&
              ((t.src = e.currentSrc), (t.srcset = "")),
            t.loading === "lazy" && (t.loading = "eager")),
          _o(t) ? this.createCustomElementClone(t) : t
        );
      }),
      (A.prototype.createCustomElementClone = function (e) {
        var t = document.createElement("html2canvascustomelement");
        return $n(e.style, t), t;
      }),
      (A.prototype.createStyleClone = function (e) {
        try {
          var t = e.sheet;
          if (t && t.cssRules) {
            var r = [].slice.call(t.cssRules, 0).reduce(function (s, i) {
                return i && typeof i.cssText == "string" ? s + i.cssText : s;
              }, ""),
              n = e.cloneNode(!1);
            return (n.textContent = r), n;
          }
        } catch (s) {
          if (
            (this.context.logger.error("Unable to access cssRules property", s),
            s.name !== "SecurityError")
          )
            throw s;
        }
        return e.cloneNode(!1);
      }),
      (A.prototype.createCanvasClone = function (e) {
        var t;
        if (this.options.inlineImages && e.ownerDocument) {
          var r = e.ownerDocument.createElement("img");
          try {
            return (r.src = e.toDataURL()), r;
          } catch {
            this.context.logger.info(
              "Unable to inline canvas contents, canvas is tainted",
              e
            );
          }
        }
        var n = e.cloneNode(!1);
        try {
          (n.width = e.width), (n.height = e.height);
          var s = e.getContext("2d"),
            i = n.getContext("2d");
          if (i)
            if (!this.options.allowTaint && s)
              i.putImageData(s.getImageData(0, 0, e.width, e.height), 0, 0);
            else {
              var o =
                (t = e.getContext("webgl2")) !== null && t !== void 0
                  ? t
                  : e.getContext("webgl");
              if (o) {
                var a = o.getContextAttributes();
                (a == null ? void 0 : a.preserveDrawingBuffer) === !1 &&
                  this.context.logger.warn(
                    "Unable to clone WebGL context as it has preserveDrawingBuffer=false",
                    e
                  );
              }
              i.drawImage(e, 0, 0);
            }
          return n;
        } catch {
          this.context.logger.info(
            "Unable to clone canvas as it is tainted",
            e
          );
        }
        return n;
      }),
      (A.prototype.createVideoClone = function (e) {
        var t = e.ownerDocument.createElement("canvas");
        (t.width = e.offsetWidth), (t.height = e.offsetHeight);
        var r = t.getContext("2d");
        try {
          return (
            r &&
              (r.drawImage(e, 0, 0, t.width, t.height),
              this.options.allowTaint ||
                r.getImageData(0, 0, t.width, t.height)),
            t
          );
        } catch {
          this.context.logger.info("Unable to clone video as it is tainted", e);
        }
        var n = e.ownerDocument.createElement("canvas");
        return (n.width = e.offsetWidth), (n.height = e.offsetHeight), n;
      }),
      (A.prototype.appendChildNode = function (e, t, r) {
        (!ft(t) ||
          (!Wd(t) &&
            !t.hasAttribute(VB) &&
            (typeof this.options.ignoreElements != "function" ||
              !this.options.ignoreElements(t)))) &&
          (!this.options.copyStyles || !ft(t) || !Oo(t)) &&
          e.appendChild(this.cloneNode(t, r));
      }),
      (A.prototype.cloneChildNodes = function (e, t, r) {
        for (
          var n = this,
            s = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild;
          s;
          s = s.nextSibling
        )
          if (ft(s) && RB(s) && typeof s.assignedNodes == "function") {
            var i = s.assignedNodes();
            i.length &&
              i.forEach(function (o) {
                return n.appendChildNode(t, o, r);
              });
          } else this.appendChildNode(t, s, r);
      }),
      (A.prototype.cloneNode = function (e, t) {
        if (SB(e)) return document.createTextNode(e.data);
        if (!e.ownerDocument) return e.cloneNode(!1);
        var r = e.ownerDocument.defaultView;
        if (r && ft(e) && (_s(e) || Nr(e))) {
          var n = this.createElementClone(e);
          n.style.transitionProperty = "none";
          var s = r.getComputedStyle(e),
            i = r.getComputedStyle(e, ":before"),
            o = r.getComputedStyle(e, ":after");
          this.referenceElement === e &&
            _s(n) &&
            (this.clonedReferenceElement = n),
            fi(n) && oC(n);
          var a = this.counters.parse(new Uo(this.context, s)),
            B = this.resolvePseudoContent(e, n, i, Wt.BEFORE);
          _o(e) && (t = !0),
            So(e) || this.cloneChildNodes(e, n, t),
            B && n.insertBefore(B, n.firstChild);
          var l = this.resolvePseudoContent(e, n, o, Wt.AFTER);
          return (
            l && n.appendChild(l),
            this.counters.pop(a),
            ((s && (this.options.copyStyles || Nr(e)) && !MB(e)) || t) &&
              $n(s, n),
            (e.scrollTop !== 0 || e.scrollLeft !== 0) &&
              this.scrolledElements.push([n, e.scrollLeft, e.scrollTop]),
            (qr(e) || $r(e)) && (qr(n) || $r(n)) && (n.value = e.value),
            n
          );
        }
        return e.cloneNode(!1);
      }),
      (A.prototype.resolvePseudoContent = function (e, t, r, n) {
        var s = this;
        if (r) {
          var i = r.content,
            o = t.ownerDocument;
          if (
            !(
              !o ||
              !i ||
              i === "none" ||
              i === "-moz-alt-content" ||
              r.display === "none"
            )
          ) {
            this.counters.parse(new Uo(this.context, r));
            var a = new kh(this.context, r),
              B = o.createElement("html2canvaspseudoelement");
            $n(r, B),
              a.content.forEach(function (c) {
                if (c.type === 0) B.appendChild(o.createTextNode(c.value));
                else if (c.type === 22) {
                  var f = o.createElement("img");
                  (f.src = c.value), (f.style.opacity = "1"), B.appendChild(f);
                } else if (c.type === 18) {
                  if (c.name === "attr") {
                    var C = c.values.filter(nA);
                    C.length &&
                      B.appendChild(
                        o.createTextNode(e.getAttribute(C[0].value) || "")
                      );
                  } else if (c.name === "counter") {
                    var d = c.values.filter(Ft),
                      Q = d[0],
                      _ = d[1];
                    if (Q && nA(Q)) {
                      var E = s.counters.getCounterValue(Q.value),
                        I = _ && nA(_) ? Ts.parse(s.context, _.value) : 3;
                      B.appendChild(o.createTextNode(tr(E, I, !1)));
                    }
                  } else if (c.name === "counters") {
                    var b = c.values.filter(Ft),
                      Q = b[0],
                      O = b[1],
                      _ = b[2];
                    if (Q && nA(Q)) {
                      var S = s.counters.getCounterValues(Q.value),
                        m = _ && nA(_) ? Ts.parse(s.context, _.value) : 3,
                        N = O && O.type === 0 ? O.value : "",
                        x = S.map(function (tA) {
                          return tr(tA, m, !1);
                        }).join(N);
                      B.appendChild(o.createTextNode(x));
                    }
                  }
                } else if (c.type === 20)
                  switch (c.value) {
                    case "open-quote":
                      B.appendChild(
                        o.createTextNode(Co(a.quotes, s.quoteDepth++, !0))
                      );
                      break;
                    case "close-quote":
                      B.appendChild(
                        o.createTextNode(Co(a.quotes, --s.quoteDepth, !1))
                      );
                      break;
                    default:
                      B.appendChild(o.createTextNode(c.value));
                  }
              }),
              (B.className = Rs + " " + Gs);
            var l = n === Wt.BEFORE ? " " + Rs : " " + Gs;
            return Nr(t) ? (t.className.baseValue += l) : (t.className += l), B;
          }
        }
      }),
      (A.destroy = function (e) {
        return e.parentNode ? (e.parentNode.removeChild(e), !0) : !1;
      }),
      A
    );
  })(),
  Wt;
(function (A) {
  (A[(A.BEFORE = 0)] = "BEFORE"), (A[(A.AFTER = 1)] = "AFTER");
})(Wt || (Wt = {}));
var zd = function (A, e) {
    var t = A.createElement("iframe");
    return (
      (t.className = "html2canvas-container"),
      (t.style.visibility = "hidden"),
      (t.style.position = "fixed"),
      (t.style.left = "-10000px"),
      (t.style.top = "0px"),
      (t.style.border = "0"),
      (t.width = e.width.toString()),
      (t.height = e.height.toString()),
      (t.scrolling = "no"),
      t.setAttribute(VB, "true"),
      A.body.appendChild(t),
      t
    );
  },
  qd = function (A) {
    return new Promise(function (e) {
      if (A.complete) {
        e();
        return;
      }
      if (!A.src) {
        e();
        return;
      }
      (A.onload = e), (A.onerror = e);
    });
  },
  $d = function (A) {
    return Promise.all([].slice.call(A.images, 0).map(qd));
  },
  AC = function (A) {
    return new Promise(function (e, t) {
      var r = A.contentWindow;
      if (!r) return t("No window assigned for iframe");
      var n = r.document;
      r.onload = A.onload = function () {
        r.onload = A.onload = null;
        var s = setInterval(function () {
          n.body.childNodes.length > 0 &&
            n.readyState === "complete" &&
            (clearInterval(s), e(A));
        }, 50);
      };
    });
  },
  eC = ["all", "d", "content"],
  $n = function (A, e) {
    for (var t = A.length - 1; t >= 0; t--) {
      var r = A.item(t);
      eC.indexOf(r) === -1 && e.style.setProperty(r, A.getPropertyValue(r));
    }
    return e;
  },
  tC = function (A) {
    var e = "";
    return (
      A &&
        ((e += "<!DOCTYPE "),
        A.name && (e += A.name),
        A.internalSubset && (e += A.internalSubset),
        A.publicId && (e += '"' + A.publicId + '"'),
        A.systemId && (e += '"' + A.systemId + '"'),
        (e += ">")),
      e
    );
  },
  rC = function (A, e, t) {
    A &&
      A.defaultView &&
      (e !== A.defaultView.pageXOffset || t !== A.defaultView.pageYOffset) &&
      A.defaultView.scrollTo(e, t);
  },
  nC = function (A) {
    var e = A[0],
      t = A[1],
      r = A[2];
    (e.scrollLeft = t), (e.scrollTop = r);
  },
  sC = ":before",
  iC = ":after",
  Rs = "___html2canvas___pseudoelement_before",
  Gs = "___html2canvas___pseudoelement_after",
  Po = `{
    content: "" !important;
    display: none !important;
}`,
  oC = function (A) {
    aC(
      A,
      "." +
        Rs +
        sC +
        Po +
        `
         .` +
        Gs +
        iC +
        Po
    );
  },
  aC = function (A, e) {
    var t = A.ownerDocument;
    if (t) {
      var r = t.createElement("style");
      (r.textContent = e), A.appendChild(r);
    }
  },
  NB = (function () {
    function A() {}
    return (
      (A.getOrigin = function (e) {
        var t = A._link;
        return t
          ? ((t.href = e), (t.href = t.href), t.protocol + t.hostname + t.port)
          : "about:blank";
      }),
      (A.isSameOrigin = function (e) {
        return A.getOrigin(e) === A._origin;
      }),
      (A.setContext = function (e) {
        (A._link = e.document.createElement("a")),
          (A._origin = A.getOrigin(e.location.href));
      }),
      (A._origin = "about:blank"),
      A
    );
  })(),
  BC = (function () {
    function A(e, t) {
      (this.context = e), (this._options = t), (this._cache = {});
    }
    return (
      (A.prototype.addImage = function (e) {
        var t = Promise.resolve();
        return (
          this.has(e) ||
            ((es(e) || fC(e)) &&
              (this._cache[e] = this.loadImage(e)).catch(function () {})),
          t
        );
      }),
      (A.prototype.match = function (e) {
        return this._cache[e];
      }),
      (A.prototype.loadImage = function (e) {
        return xA(this, void 0, void 0, function () {
          var t,
            r,
            n,
            s,
            i = this;
          return vA(this, function (o) {
            switch (o.label) {
              case 0:
                return (
                  (t = NB.isSameOrigin(e)),
                  (r =
                    !As(e) &&
                    this._options.useCORS === !0 &&
                    pA.SUPPORT_CORS_IMAGES &&
                    !t),
                  (n =
                    !As(e) &&
                    !t &&
                    !es(e) &&
                    typeof this._options.proxy == "string" &&
                    pA.SUPPORT_CORS_XHR &&
                    !r),
                  !t &&
                  this._options.allowTaint === !1 &&
                  !As(e) &&
                  !es(e) &&
                  !n &&
                  !r
                    ? [2]
                    : ((s = e), n ? [4, this.proxy(s)] : [3, 2])
                );
              case 1:
                (s = o.sent()), (o.label = 2);
              case 2:
                return (
                  this.context.logger.debug(
                    "Added image " + e.substring(0, 256)
                  ),
                  [
                    4,
                    new Promise(function (a, B) {
                      var l = new Image();
                      (l.onload = function () {
                        return a(l);
                      }),
                        (l.onerror = B),
                        (gC(s) || r) && (l.crossOrigin = "anonymous"),
                        (l.src = s),
                        l.complete === !0 &&
                          setTimeout(function () {
                            return a(l);
                          }, 500),
                        i._options.imageTimeout > 0 &&
                          setTimeout(function () {
                            return B(
                              "Timed out (" +
                                i._options.imageTimeout +
                                "ms) loading image"
                            );
                          }, i._options.imageTimeout);
                    }),
                  ]
                );
              case 3:
                return [2, o.sent()];
            }
          });
        });
      }),
      (A.prototype.has = function (e) {
        return typeof this._cache[e] < "u";
      }),
      (A.prototype.keys = function () {
        return Promise.resolve(Object.keys(this._cache));
      }),
      (A.prototype.proxy = function (e) {
        var t = this,
          r = this._options.proxy;
        if (!r) throw new Error("No proxy defined");
        var n = e.substring(0, 256);
        return new Promise(function (s, i) {
          var o = pA.SUPPORT_RESPONSE_TYPE ? "blob" : "text",
            a = new XMLHttpRequest();
          (a.onload = function () {
            if (a.status === 200)
              if (o === "text") s(a.response);
              else {
                var c = new FileReader();
                c.addEventListener(
                  "load",
                  function () {
                    return s(c.result);
                  },
                  !1
                ),
                  c.addEventListener(
                    "error",
                    function (f) {
                      return i(f);
                    },
                    !1
                  ),
                  c.readAsDataURL(a.response);
              }
            else
              i(
                "Failed to proxy resource " +
                  n +
                  " with status code " +
                  a.status
              );
          }),
            (a.onerror = i);
          var B = r.indexOf("?") > -1 ? "&" : "?";
          if (
            (a.open(
              "GET",
              "" + r + B + "url=" + encodeURIComponent(e) + "&responseType=" + o
            ),
            o !== "text" && a instanceof XMLHttpRequest && (a.responseType = o),
            t._options.imageTimeout)
          ) {
            var l = t._options.imageTimeout;
            (a.timeout = l),
              (a.ontimeout = function () {
                return i("Timed out (" + l + "ms) proxying " + n);
              });
          }
          a.send();
        });
      }),
      A
    );
  })(),
  lC = /^data:image\/svg\+xml/i,
  cC = /^data:image\/.*;base64,/i,
  uC = /^data:image\/.*/i,
  fC = function (A) {
    return pA.SUPPORT_SVG_DRAWING || !wC(A);
  },
  As = function (A) {
    return uC.test(A);
  },
  gC = function (A) {
    return cC.test(A);
  },
  es = function (A) {
    return A.substr(0, 4) === "blob";
  },
  wC = function (A) {
    return A.substr(-3).toLowerCase() === "svg" || lC.test(A);
  },
  K = (function () {
    function A(e, t) {
      (this.type = 0), (this.x = e), (this.y = t);
    }
    return (
      (A.prototype.add = function (e, t) {
        return new A(this.x + e, this.y + t);
      }),
      A
    );
  })(),
  it = function (A, e, t) {
    return new K(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
  },
  Kr = (function () {
    function A(e, t, r, n) {
      (this.type = 1),
        (this.start = e),
        (this.startControl = t),
        (this.endControl = r),
        (this.end = n);
    }
    return (
      (A.prototype.subdivide = function (e, t) {
        var r = it(this.start, this.startControl, e),
          n = it(this.startControl, this.endControl, e),
          s = it(this.endControl, this.end, e),
          i = it(r, n, e),
          o = it(n, s, e),
          a = it(i, o, e);
        return t ? new A(this.start, r, i, a) : new A(a, o, s, this.end);
      }),
      (A.prototype.add = function (e, t) {
        return new A(
          this.start.add(e, t),
          this.startControl.add(e, t),
          this.endControl.add(e, t),
          this.end.add(e, t)
        );
      }),
      (A.prototype.reverse = function () {
        return new A(this.end, this.endControl, this.startControl, this.start);
      }),
      A
    );
  })(),
  XA = function (A) {
    return A.type === 1;
  },
  QC = (function () {
    function A(e) {
      var t = e.styles,
        r = e.bounds,
        n = Mt(t.borderTopLeftRadius, r.width, r.height),
        s = n[0],
        i = n[1],
        o = Mt(t.borderTopRightRadius, r.width, r.height),
        a = o[0],
        B = o[1],
        l = Mt(t.borderBottomRightRadius, r.width, r.height),
        c = l[0],
        f = l[1],
        C = Mt(t.borderBottomLeftRadius, r.width, r.height),
        d = C[0],
        Q = C[1],
        _ = [];
      _.push((s + a) / r.width),
        _.push((d + c) / r.width),
        _.push((i + Q) / r.height),
        _.push((B + f) / r.height);
      var E = Math.max.apply(Math, _);
      E > 1 &&
        ((s /= E),
        (i /= E),
        (a /= E),
        (B /= E),
        (c /= E),
        (f /= E),
        (d /= E),
        (Q /= E));
      var I = r.width - a,
        b = r.height - f,
        O = r.width - c,
        S = r.height - Q,
        m = t.borderTopWidth,
        N = t.borderRightWidth,
        x = t.borderBottomWidth,
        D = t.borderLeftWidth,
        k = iA(t.paddingTop, e.bounds.width),
        tA = iA(t.paddingRight, e.bounds.width),
        aA = iA(t.paddingBottom, e.bounds.width),
        J = iA(t.paddingLeft, e.bounds.width);
      (this.topLeftBorderDoubleOuterBox =
        s > 0 || i > 0
          ? BA(r.left + D / 3, r.top + m / 3, s - D / 3, i - m / 3, AA.TOP_LEFT)
          : new K(r.left + D / 3, r.top + m / 3)),
        (this.topRightBorderDoubleOuterBox =
          s > 0 || i > 0
            ? BA(r.left + I, r.top + m / 3, a - N / 3, B - m / 3, AA.TOP_RIGHT)
            : new K(r.left + r.width - N / 3, r.top + m / 3)),
        (this.bottomRightBorderDoubleOuterBox =
          c > 0 || f > 0
            ? BA(r.left + O, r.top + b, c - N / 3, f - x / 3, AA.BOTTOM_RIGHT)
            : new K(r.left + r.width - N / 3, r.top + r.height - x / 3)),
        (this.bottomLeftBorderDoubleOuterBox =
          d > 0 || Q > 0
            ? BA(
                r.left + D / 3,
                r.top + S,
                d - D / 3,
                Q - x / 3,
                AA.BOTTOM_LEFT
              )
            : new K(r.left + D / 3, r.top + r.height - x / 3)),
        (this.topLeftBorderDoubleInnerBox =
          s > 0 || i > 0
            ? BA(
                r.left + (D * 2) / 3,
                r.top + (m * 2) / 3,
                s - (D * 2) / 3,
                i - (m * 2) / 3,
                AA.TOP_LEFT
              )
            : new K(r.left + (D * 2) / 3, r.top + (m * 2) / 3)),
        (this.topRightBorderDoubleInnerBox =
          s > 0 || i > 0
            ? BA(
                r.left + I,
                r.top + (m * 2) / 3,
                a - (N * 2) / 3,
                B - (m * 2) / 3,
                AA.TOP_RIGHT
              )
            : new K(r.left + r.width - (N * 2) / 3, r.top + (m * 2) / 3)),
        (this.bottomRightBorderDoubleInnerBox =
          c > 0 || f > 0
            ? BA(
                r.left + O,
                r.top + b,
                c - (N * 2) / 3,
                f - (x * 2) / 3,
                AA.BOTTOM_RIGHT
              )
            : new K(
                r.left + r.width - (N * 2) / 3,
                r.top + r.height - (x * 2) / 3
              )),
        (this.bottomLeftBorderDoubleInnerBox =
          d > 0 || Q > 0
            ? BA(
                r.left + (D * 2) / 3,
                r.top + S,
                d - (D * 2) / 3,
                Q - (x * 2) / 3,
                AA.BOTTOM_LEFT
              )
            : new K(r.left + (D * 2) / 3, r.top + r.height - (x * 2) / 3)),
        (this.topLeftBorderStroke =
          s > 0 || i > 0
            ? BA(
                r.left + D / 2,
                r.top + m / 2,
                s - D / 2,
                i - m / 2,
                AA.TOP_LEFT
              )
            : new K(r.left + D / 2, r.top + m / 2)),
        (this.topRightBorderStroke =
          s > 0 || i > 0
            ? BA(r.left + I, r.top + m / 2, a - N / 2, B - m / 2, AA.TOP_RIGHT)
            : new K(r.left + r.width - N / 2, r.top + m / 2)),
        (this.bottomRightBorderStroke =
          c > 0 || f > 0
            ? BA(r.left + O, r.top + b, c - N / 2, f - x / 2, AA.BOTTOM_RIGHT)
            : new K(r.left + r.width - N / 2, r.top + r.height - x / 2)),
        (this.bottomLeftBorderStroke =
          d > 0 || Q > 0
            ? BA(
                r.left + D / 2,
                r.top + S,
                d - D / 2,
                Q - x / 2,
                AA.BOTTOM_LEFT
              )
            : new K(r.left + D / 2, r.top + r.height - x / 2)),
        (this.topLeftBorderBox =
          s > 0 || i > 0
            ? BA(r.left, r.top, s, i, AA.TOP_LEFT)
            : new K(r.left, r.top)),
        (this.topRightBorderBox =
          a > 0 || B > 0
            ? BA(r.left + I, r.top, a, B, AA.TOP_RIGHT)
            : new K(r.left + r.width, r.top)),
        (this.bottomRightBorderBox =
          c > 0 || f > 0
            ? BA(r.left + O, r.top + b, c, f, AA.BOTTOM_RIGHT)
            : new K(r.left + r.width, r.top + r.height)),
        (this.bottomLeftBorderBox =
          d > 0 || Q > 0
            ? BA(r.left, r.top + S, d, Q, AA.BOTTOM_LEFT)
            : new K(r.left, r.top + r.height)),
        (this.topLeftPaddingBox =
          s > 0 || i > 0
            ? BA(
                r.left + D,
                r.top + m,
                Math.max(0, s - D),
                Math.max(0, i - m),
                AA.TOP_LEFT
              )
            : new K(r.left + D, r.top + m)),
        (this.topRightPaddingBox =
          a > 0 || B > 0
            ? BA(
                r.left + Math.min(I, r.width - N),
                r.top + m,
                I > r.width + N ? 0 : Math.max(0, a - N),
                Math.max(0, B - m),
                AA.TOP_RIGHT
              )
            : new K(r.left + r.width - N, r.top + m)),
        (this.bottomRightPaddingBox =
          c > 0 || f > 0
            ? BA(
                r.left + Math.min(O, r.width - D),
                r.top + Math.min(b, r.height - x),
                Math.max(0, c - N),
                Math.max(0, f - x),
                AA.BOTTOM_RIGHT
              )
            : new K(r.left + r.width - N, r.top + r.height - x)),
        (this.bottomLeftPaddingBox =
          d > 0 || Q > 0
            ? BA(
                r.left + D,
                r.top + Math.min(S, r.height - x),
                Math.max(0, d - D),
                Math.max(0, Q - x),
                AA.BOTTOM_LEFT
              )
            : new K(r.left + D, r.top + r.height - x)),
        (this.topLeftContentBox =
          s > 0 || i > 0
            ? BA(
                r.left + D + J,
                r.top + m + k,
                Math.max(0, s - (D + J)),
                Math.max(0, i - (m + k)),
                AA.TOP_LEFT
              )
            : new K(r.left + D + J, r.top + m + k)),
        (this.topRightContentBox =
          a > 0 || B > 0
            ? BA(
                r.left + Math.min(I, r.width + D + J),
                r.top + m + k,
                I > r.width + D + J ? 0 : a - D + J,
                B - (m + k),
                AA.TOP_RIGHT
              )
            : new K(r.left + r.width - (N + tA), r.top + m + k)),
        (this.bottomRightContentBox =
          c > 0 || f > 0
            ? BA(
                r.left + Math.min(O, r.width - (D + J)),
                r.top + Math.min(b, r.height + m + k),
                Math.max(0, c - (N + tA)),
                f - (x + aA),
                AA.BOTTOM_RIGHT
              )
            : new K(r.left + r.width - (N + tA), r.top + r.height - (x + aA))),
        (this.bottomLeftContentBox =
          d > 0 || Q > 0
            ? BA(
                r.left + D + J,
                r.top + S,
                Math.max(0, d - (D + J)),
                Q - (x + aA),
                AA.BOTTOM_LEFT
              )
            : new K(r.left + D + J, r.top + r.height - (x + aA)));
    }
    return A;
  })(),
  AA;
(function (A) {
  (A[(A.TOP_LEFT = 0)] = "TOP_LEFT"),
    (A[(A.TOP_RIGHT = 1)] = "TOP_RIGHT"),
    (A[(A.BOTTOM_RIGHT = 2)] = "BOTTOM_RIGHT"),
    (A[(A.BOTTOM_LEFT = 3)] = "BOTTOM_LEFT");
})(AA || (AA = {}));
var BA = function (A, e, t, r, n) {
    var s = 4 * ((Math.sqrt(2) - 1) / 3),
      i = t * s,
      o = r * s,
      a = A + t,
      B = e + r;
    switch (n) {
      case AA.TOP_LEFT:
        return new Kr(
          new K(A, B),
          new K(A, B - o),
          new K(a - i, e),
          new K(a, e)
        );
      case AA.TOP_RIGHT:
        return new Kr(
          new K(A, e),
          new K(A + i, e),
          new K(a, B - o),
          new K(a, B)
        );
      case AA.BOTTOM_RIGHT:
        return new Kr(
          new K(a, e),
          new K(a, e + o),
          new K(A + i, B),
          new K(A, B)
        );
      case AA.BOTTOM_LEFT:
      default:
        return new Kr(
          new K(a, B),
          new K(a - i, B),
          new K(A, e + o),
          new K(A, e)
        );
    }
  },
  An = function (A) {
    return [
      A.topLeftBorderBox,
      A.topRightBorderBox,
      A.bottomRightBorderBox,
      A.bottomLeftBorderBox,
    ];
  },
  hC = function (A) {
    return [
      A.topLeftContentBox,
      A.topRightContentBox,
      A.bottomRightContentBox,
      A.bottomLeftContentBox,
    ];
  },
  en = function (A) {
    return [
      A.topLeftPaddingBox,
      A.topRightPaddingBox,
      A.bottomRightPaddingBox,
      A.bottomLeftPaddingBox,
    ];
  },
  dC = (function () {
    function A(e, t, r) {
      (this.offsetX = e),
        (this.offsetY = t),
        (this.matrix = r),
        (this.type = 0),
        (this.target = 6);
    }
    return A;
  })(),
  xr = (function () {
    function A(e, t) {
      (this.path = e), (this.target = t), (this.type = 1);
    }
    return A;
  })(),
  CC = (function () {
    function A(e) {
      (this.opacity = e), (this.type = 2), (this.target = 6);
    }
    return A;
  })(),
  UC = function (A) {
    return A.type === 0;
  },
  kB = function (A) {
    return A.type === 1;
  },
  FC = function (A) {
    return A.type === 2;
  },
  Xo = function (A, e) {
    return A.length === e.length
      ? A.some(function (t, r) {
          return t === e[r];
        })
      : !1;
  },
  pC = function (A, e, t, r, n) {
    return A.map(function (s, i) {
      switch (i) {
        case 0:
          return s.add(e, t);
        case 1:
          return s.add(e + r, t);
        case 2:
          return s.add(e + r, t + n);
        case 3:
          return s.add(e, t + n);
      }
      return s;
    });
  },
  PB = (function () {
    function A(e) {
      (this.element = e),
        (this.inlineLevel = []),
        (this.nonInlineLevel = []),
        (this.negativeZIndex = []),
        (this.zeroOrAutoZIndexOrTransformedOrOpacity = []),
        (this.positiveZIndex = []),
        (this.nonPositionedFloats = []),
        (this.nonPositionedInlineLevel = []);
    }
    return A;
  })(),
  XB = (function () {
    function A(e, t) {
      if (
        ((this.container = e),
        (this.parent = t),
        (this.effects = []),
        (this.curves = new QC(this.container)),
        this.container.styles.opacity < 1 &&
          this.effects.push(new CC(this.container.styles.opacity)),
        this.container.styles.transform !== null)
      ) {
        var r =
            this.container.bounds.left +
            this.container.styles.transformOrigin[0].number,
          n =
            this.container.bounds.top +
            this.container.styles.transformOrigin[1].number,
          s = this.container.styles.transform;
        this.effects.push(new dC(r, n, s));
      }
      if (this.container.styles.overflowX !== 0) {
        var i = An(this.curves),
          o = en(this.curves);
        Xo(i, o)
          ? this.effects.push(new xr(i, 6))
          : (this.effects.push(new xr(i, 2)), this.effects.push(new xr(o, 4)));
      }
    }
    return (
      (A.prototype.getEffects = function (e) {
        for (
          var t = [2, 3].indexOf(this.container.styles.position) === -1,
            r = this.parent,
            n = this.effects.slice(0);
          r;

        ) {
          var s = r.effects.filter(function (a) {
            return !kB(a);
          });
          if (t || r.container.styles.position !== 0 || !r.parent) {
            if (
              (n.unshift.apply(n, s),
              (t = [2, 3].indexOf(r.container.styles.position) === -1),
              r.container.styles.overflowX !== 0)
            ) {
              var i = An(r.curves),
                o = en(r.curves);
              Xo(i, o) || n.unshift(new xr(o, 6));
            }
          } else n.unshift.apply(n, s);
          r = r.parent;
        }
        return n.filter(function (a) {
          return hA(a.target, e);
        });
      }),
      A
    );
  })(),
  Vs = function (A, e, t, r) {
    A.container.elements.forEach(function (n) {
      var s = hA(n.flags, 4),
        i = hA(n.flags, 2),
        o = new XB(n, A);
      hA(n.styles.display, 2048) && r.push(o);
      var a = hA(n.flags, 8) ? [] : r;
      if (s || i) {
        var B = s || n.styles.isPositioned() ? t : e,
          l = new PB(o);
        if (
          n.styles.isPositioned() ||
          n.styles.opacity < 1 ||
          n.styles.isTransformed()
        ) {
          var c = n.styles.zIndex.order;
          if (c < 0) {
            var f = 0;
            B.negativeZIndex.some(function (d, Q) {
              return c > d.element.container.styles.zIndex.order
                ? ((f = Q), !1)
                : f > 0;
            }),
              B.negativeZIndex.splice(f, 0, l);
          } else if (c > 0) {
            var C = 0;
            B.positiveZIndex.some(function (d, Q) {
              return c >= d.element.container.styles.zIndex.order
                ? ((C = Q + 1), !1)
                : C > 0;
            }),
              B.positiveZIndex.splice(C, 0, l);
          } else B.zeroOrAutoZIndexOrTransformedOrOpacity.push(l);
        } else
          n.styles.isFloating()
            ? B.nonPositionedFloats.push(l)
            : B.nonPositionedInlineLevel.push(l);
        Vs(o, l, s ? l : t, a);
      } else n.styles.isInlineLevel() ? e.inlineLevel.push(o) : e.nonInlineLevel.push(o), Vs(o, e, t, a);
      hA(n.flags, 8) && JB(n, a);
    });
  },
  JB = function (A, e) {
    for (
      var t = A instanceof Os ? A.start : 1,
        r = A instanceof Os ? A.reversed : !1,
        n = 0;
      n < e.length;
      n++
    ) {
      var s = e[n];
      s.container instanceof bB &&
        typeof s.container.value == "number" &&
        s.container.value !== 0 &&
        (t = s.container.value),
        (s.listValue = tr(t, s.container.styles.listStyleType, !0)),
        (t += r ? -1 : 1);
    }
  },
  EC = function (A) {
    var e = new XB(A, null),
      t = new PB(e),
      r = [];
    return Vs(e, t, t, r), JB(e.container, r), t;
  },
  Jo = function (A, e) {
    switch (e) {
      case 0:
        return WA(
          A.topLeftBorderBox,
          A.topLeftPaddingBox,
          A.topRightBorderBox,
          A.topRightPaddingBox
        );
      case 1:
        return WA(
          A.topRightBorderBox,
          A.topRightPaddingBox,
          A.bottomRightBorderBox,
          A.bottomRightPaddingBox
        );
      case 2:
        return WA(
          A.bottomRightBorderBox,
          A.bottomRightPaddingBox,
          A.bottomLeftBorderBox,
          A.bottomLeftPaddingBox
        );
      case 3:
      default:
        return WA(
          A.bottomLeftBorderBox,
          A.bottomLeftPaddingBox,
          A.topLeftBorderBox,
          A.topLeftPaddingBox
        );
    }
  },
  HC = function (A, e) {
    switch (e) {
      case 0:
        return WA(
          A.topLeftBorderBox,
          A.topLeftBorderDoubleOuterBox,
          A.topRightBorderBox,
          A.topRightBorderDoubleOuterBox
        );
      case 1:
        return WA(
          A.topRightBorderBox,
          A.topRightBorderDoubleOuterBox,
          A.bottomRightBorderBox,
          A.bottomRightBorderDoubleOuterBox
        );
      case 2:
        return WA(
          A.bottomRightBorderBox,
          A.bottomRightBorderDoubleOuterBox,
          A.bottomLeftBorderBox,
          A.bottomLeftBorderDoubleOuterBox
        );
      case 3:
      default:
        return WA(
          A.bottomLeftBorderBox,
          A.bottomLeftBorderDoubleOuterBox,
          A.topLeftBorderBox,
          A.topLeftBorderDoubleOuterBox
        );
    }
  },
  vC = function (A, e) {
    switch (e) {
      case 0:
        return WA(
          A.topLeftBorderDoubleInnerBox,
          A.topLeftPaddingBox,
          A.topRightBorderDoubleInnerBox,
          A.topRightPaddingBox
        );
      case 1:
        return WA(
          A.topRightBorderDoubleInnerBox,
          A.topRightPaddingBox,
          A.bottomRightBorderDoubleInnerBox,
          A.bottomRightPaddingBox
        );
      case 2:
        return WA(
          A.bottomRightBorderDoubleInnerBox,
          A.bottomRightPaddingBox,
          A.bottomLeftBorderDoubleInnerBox,
          A.bottomLeftPaddingBox
        );
      case 3:
      default:
        return WA(
          A.bottomLeftBorderDoubleInnerBox,
          A.bottomLeftPaddingBox,
          A.topLeftBorderDoubleInnerBox,
          A.topLeftPaddingBox
        );
    }
  },
  mC = function (A, e) {
    switch (e) {
      case 0:
        return Lr(A.topLeftBorderStroke, A.topRightBorderStroke);
      case 1:
        return Lr(A.topRightBorderStroke, A.bottomRightBorderStroke);
      case 2:
        return Lr(A.bottomRightBorderStroke, A.bottomLeftBorderStroke);
      case 3:
      default:
        return Lr(A.bottomLeftBorderStroke, A.topLeftBorderStroke);
    }
  },
  Lr = function (A, e) {
    var t = [];
    return (
      XA(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A),
      XA(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e),
      t
    );
  },
  WA = function (A, e, t, r) {
    var n = [];
    return (
      XA(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A),
      XA(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t),
      XA(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r),
      XA(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e),
      n
    );
  },
  WB = function (A) {
    var e = A.bounds,
      t = A.styles;
    return e.add(
      t.borderLeftWidth,
      t.borderTopWidth,
      -(t.borderRightWidth + t.borderLeftWidth),
      -(t.borderTopWidth + t.borderBottomWidth)
    );
  },
  tn = function (A) {
    var e = A.styles,
      t = A.bounds,
      r = iA(e.paddingLeft, t.width),
      n = iA(e.paddingRight, t.width),
      s = iA(e.paddingTop, t.width),
      i = iA(e.paddingBottom, t.width);
    return t.add(
      r + e.borderLeftWidth,
      s + e.borderTopWidth,
      -(e.borderRightWidth + e.borderLeftWidth + r + n),
      -(e.borderTopWidth + e.borderBottomWidth + s + i)
    );
  },
  IC = function (A, e) {
    return A === 0 ? e.bounds : A === 2 ? tn(e) : WB(e);
  },
  yC = function (A, e) {
    return A === 0 ? e.bounds : A === 2 ? tn(e) : WB(e);
  },
  ts = function (A, e, t) {
    var r = IC(ct(A.styles.backgroundOrigin, e), A),
      n = yC(ct(A.styles.backgroundClip, e), A),
      s = bC(ct(A.styles.backgroundSize, e), t, r),
      i = s[0],
      o = s[1],
      a = Mt(ct(A.styles.backgroundPosition, e), r.width - i, r.height - o),
      B = KC(ct(A.styles.backgroundRepeat, e), a, s, r, n),
      l = Math.round(r.left + a[0]),
      c = Math.round(r.top + a[1]);
    return [B, l, c, i, o];
  },
  ot = function (A) {
    return nA(A) && A.value === Ct.AUTO;
  },
  Tr = function (A) {
    return typeof A == "number";
  },
  bC = function (A, e, t) {
    var r = e[0],
      n = e[1],
      s = e[2],
      i = A[0],
      o = A[1];
    if (!i) return [0, 0];
    if (QA(i) && o && QA(o)) return [iA(i, t.width), iA(o, t.height)];
    var a = Tr(s);
    if (nA(i) && (i.value === Ct.CONTAIN || i.value === Ct.COVER)) {
      if (Tr(s)) {
        var B = t.width / t.height;
        return B < s != (i.value === Ct.COVER)
          ? [t.width, t.width / s]
          : [t.height * s, t.height];
      }
      return [t.width, t.height];
    }
    var l = Tr(r),
      c = Tr(n),
      f = l || c;
    if (ot(i) && (!o || ot(o))) {
      if (l && c) return [r, n];
      if (!a && !f) return [t.width, t.height];
      if (f && a) {
        var C = l ? r : n * s,
          d = c ? n : r / s;
        return [C, d];
      }
      var Q = l ? r : t.width,
        _ = c ? n : t.height;
      return [Q, _];
    }
    if (a) {
      var E = 0,
        I = 0;
      return (
        QA(i) ? (E = iA(i, t.width)) : QA(o) && (I = iA(o, t.height)),
        ot(i) ? (E = I * s) : (!o || ot(o)) && (I = E / s),
        [E, I]
      );
    }
    var b = null,
      O = null;
    if (
      (QA(i) ? (b = iA(i, t.width)) : o && QA(o) && (O = iA(o, t.height)),
      b !== null && (!o || ot(o)) && (O = l && c ? (b / r) * n : t.height),
      O !== null && ot(i) && (b = l && c ? (O / n) * r : t.width),
      b !== null && O !== null)
    )
      return [b, O];
    throw new Error("Unable to calculate background-size for element");
  },
  ct = function (A, e) {
    var t = A[e];
    return typeof t > "u" ? A[0] : t;
  },
  KC = function (A, e, t, r, n) {
    var s = e[0],
      i = e[1],
      o = t[0],
      a = t[1];
    switch (A) {
      case 2:
        return [
          new K(Math.round(r.left), Math.round(r.top + i)),
          new K(Math.round(r.left + r.width), Math.round(r.top + i)),
          new K(Math.round(r.left + r.width), Math.round(a + r.top + i)),
          new K(Math.round(r.left), Math.round(a + r.top + i)),
        ];
      case 3:
        return [
          new K(Math.round(r.left + s), Math.round(r.top)),
          new K(Math.round(r.left + s + o), Math.round(r.top)),
          new K(Math.round(r.left + s + o), Math.round(r.height + r.top)),
          new K(Math.round(r.left + s), Math.round(r.height + r.top)),
        ];
      case 1:
        return [
          new K(Math.round(r.left + s), Math.round(r.top + i)),
          new K(Math.round(r.left + s + o), Math.round(r.top + i)),
          new K(Math.round(r.left + s + o), Math.round(r.top + i + a)),
          new K(Math.round(r.left + s), Math.round(r.top + i + a)),
        ];
      default:
        return [
          new K(Math.round(n.left), Math.round(n.top)),
          new K(Math.round(n.left + n.width), Math.round(n.top)),
          new K(Math.round(n.left + n.width), Math.round(n.height + n.top)),
          new K(Math.round(n.left), Math.round(n.height + n.top)),
        ];
    }
  },
  xC =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  Wo = "Hidden Text",
  LC = (function () {
    function A(e) {
      (this._data = {}), (this._document = e);
    }
    return (
      (A.prototype.parseMetrics = function (e, t) {
        var r = this._document.createElement("div"),
          n = this._document.createElement("img"),
          s = this._document.createElement("span"),
          i = this._document.body;
        (r.style.visibility = "hidden"),
          (r.style.fontFamily = e),
          (r.style.fontSize = t),
          (r.style.margin = "0"),
          (r.style.padding = "0"),
          (r.style.whiteSpace = "nowrap"),
          i.appendChild(r),
          (n.src = xC),
          (n.width = 1),
          (n.height = 1),
          (n.style.margin = "0"),
          (n.style.padding = "0"),
          (n.style.verticalAlign = "baseline"),
          (s.style.fontFamily = e),
          (s.style.fontSize = t),
          (s.style.margin = "0"),
          (s.style.padding = "0"),
          s.appendChild(this._document.createTextNode(Wo)),
          r.appendChild(s),
          r.appendChild(n);
        var o = n.offsetTop - s.offsetTop + 2;
        r.removeChild(s),
          r.appendChild(this._document.createTextNode(Wo)),
          (r.style.lineHeight = "normal"),
          (n.style.verticalAlign = "super");
        var a = n.offsetTop - r.offsetTop + 2;
        return i.removeChild(r), { baseline: o, middle: a };
      }),
      (A.prototype.getMetrics = function (e, t) {
        var r = e + " " + t;
        return (
          typeof this._data[r] > "u" &&
            (this._data[r] = this.parseMetrics(e, t)),
          this._data[r]
        );
      }),
      A
    );
  })(),
  YB = (function () {
    function A(e, t) {
      (this.context = e), (this.options = t);
    }
    return A;
  })(),
  TC = 1e4,
  DC = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (
        (n._activeEffects = []),
        (n.canvas = r.canvas ? r.canvas : document.createElement("canvas")),
        (n.ctx = n.canvas.getContext("2d")),
        r.canvas ||
          ((n.canvas.width = Math.floor(r.width * r.scale)),
          (n.canvas.height = Math.floor(r.height * r.scale)),
          (n.canvas.style.width = r.width + "px"),
          (n.canvas.style.height = r.height + "px")),
        (n.fontMetrics = new LC(document)),
        n.ctx.scale(n.options.scale, n.options.scale),
        n.ctx.translate(-r.x, -r.y),
        (n.ctx.textBaseline = "bottom"),
        (n._activeEffects = []),
        n.context.logger.debug(
          "Canvas renderer initialized (" +
            r.width +
            "x" +
            r.height +
            ") with scale " +
            r.scale
        ),
        n
      );
    }
    return (
      (e.prototype.applyEffects = function (t) {
        for (var r = this; this._activeEffects.length; ) this.popEffect();
        t.forEach(function (n) {
          return r.applyEffect(n);
        });
      }),
      (e.prototype.applyEffect = function (t) {
        this.ctx.save(),
          FC(t) && (this.ctx.globalAlpha = t.opacity),
          UC(t) &&
            (this.ctx.translate(t.offsetX, t.offsetY),
            this.ctx.transform(
              t.matrix[0],
              t.matrix[1],
              t.matrix[2],
              t.matrix[3],
              t.matrix[4],
              t.matrix[5]
            ),
            this.ctx.translate(-t.offsetX, -t.offsetY)),
          kB(t) && (this.path(t.path), this.ctx.clip()),
          this._activeEffects.push(t);
      }),
      (e.prototype.popEffect = function () {
        this._activeEffects.pop(), this.ctx.restore();
      }),
      (e.prototype.renderStack = function (t) {
        return xA(this, void 0, void 0, function () {
          var r;
          return vA(this, function (n) {
            switch (n.label) {
              case 0:
                return (
                  (r = t.element.container.styles),
                  r.isVisible() ? [4, this.renderStackContent(t)] : [3, 2]
                );
              case 1:
                n.sent(), (n.label = 2);
              case 2:
                return [2];
            }
          });
        });
      }),
      (e.prototype.renderNode = function (t) {
        return xA(this, void 0, void 0, function () {
          return vA(this, function (r) {
            switch (r.label) {
              case 0:
                if (hA(t.container.flags, 16)) debugger;
                return t.container.styles.isVisible()
                  ? [4, this.renderNodeBackgroundAndBorders(t)]
                  : [3, 3];
              case 1:
                return r.sent(), [4, this.renderNodeContent(t)];
              case 2:
                r.sent(), (r.label = 3);
              case 3:
                return [2];
            }
          });
        });
      }),
      (e.prototype.renderTextWithLetterSpacing = function (t, r, n) {
        var s = this;
        if (r === 0) this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + n);
        else {
          var i = ci(t.text);
          i.reduce(function (o, a) {
            return (
              s.ctx.fillText(a, o, t.bounds.top + n),
              o + s.ctx.measureText(a).width
            );
          }, t.bounds.left);
        }
      }),
      (e.prototype.createFontStyle = function (t) {
        var r = t.fontVariant
            .filter(function (i) {
              return i === "normal" || i === "small-caps";
            })
            .join(""),
          n = RC(t.fontFamily).join(", "),
          s = nr(t.fontSize)
            ? "" + t.fontSize.number + t.fontSize.unit
            : t.fontSize.number + "px";
        return [[t.fontStyle, r, t.fontWeight, s, n].join(" "), n, s];
      }),
      (e.prototype.renderTextNode = function (t, r) {
        return xA(this, void 0, void 0, function () {
          var n,
            s,
            i,
            o,
            a,
            B,
            l,
            c,
            f = this;
          return vA(this, function (C) {
            return (
              (n = this.createFontStyle(r)),
              (s = n[0]),
              (i = n[1]),
              (o = n[2]),
              (this.ctx.font = s),
              (this.ctx.direction = r.direction === 1 ? "rtl" : "ltr"),
              (this.ctx.textAlign = "left"),
              (this.ctx.textBaseline = "alphabetic"),
              (a = this.fontMetrics.getMetrics(i, o)),
              (B = a.baseline),
              (l = a.middle),
              (c = r.paintOrder),
              t.textBounds.forEach(function (d) {
                c.forEach(function (Q) {
                  switch (Q) {
                    case 0:
                      (f.ctx.fillStyle = UA(r.color)),
                        f.renderTextWithLetterSpacing(d, r.letterSpacing, B);
                      var _ = r.textShadow;
                      _.length &&
                        d.text.trim().length &&
                        (_.slice(0)
                          .reverse()
                          .forEach(function (E) {
                            (f.ctx.shadowColor = UA(E.color)),
                              (f.ctx.shadowOffsetX =
                                E.offsetX.number * f.options.scale),
                              (f.ctx.shadowOffsetY =
                                E.offsetY.number * f.options.scale),
                              (f.ctx.shadowBlur = E.blur.number),
                              f.renderTextWithLetterSpacing(
                                d,
                                r.letterSpacing,
                                B
                              );
                          }),
                        (f.ctx.shadowColor = ""),
                        (f.ctx.shadowOffsetX = 0),
                        (f.ctx.shadowOffsetY = 0),
                        (f.ctx.shadowBlur = 0)),
                        r.textDecorationLine.length &&
                          ((f.ctx.fillStyle = UA(
                            r.textDecorationColor || r.color
                          )),
                          r.textDecorationLine.forEach(function (E) {
                            switch (E) {
                              case 1:
                                f.ctx.fillRect(
                                  d.bounds.left,
                                  Math.round(d.bounds.top + B),
                                  d.bounds.width,
                                  1
                                );
                                break;
                              case 2:
                                f.ctx.fillRect(
                                  d.bounds.left,
                                  Math.round(d.bounds.top),
                                  d.bounds.width,
                                  1
                                );
                                break;
                              case 3:
                                f.ctx.fillRect(
                                  d.bounds.left,
                                  Math.ceil(d.bounds.top + l),
                                  d.bounds.width,
                                  1
                                );
                                break;
                            }
                          }));
                      break;
                    case 1:
                      r.webkitTextStrokeWidth &&
                        d.text.trim().length &&
                        ((f.ctx.strokeStyle = UA(r.webkitTextStrokeColor)),
                        (f.ctx.lineWidth = r.webkitTextStrokeWidth),
                        (f.ctx.lineJoin = window.chrome ? "miter" : "round"),
                        f.ctx.strokeText(
                          d.text,
                          d.bounds.left,
                          d.bounds.top + B
                        )),
                        (f.ctx.strokeStyle = ""),
                        (f.ctx.lineWidth = 0),
                        (f.ctx.lineJoin = "miter");
                      break;
                  }
                });
              }),
              [2]
            );
          });
        });
      }),
      (e.prototype.renderReplacedElement = function (t, r, n) {
        if (n && t.intrinsicWidth > 0 && t.intrinsicHeight > 0) {
          var s = tn(t),
            i = en(r);
          this.path(i),
            this.ctx.save(),
            this.ctx.clip(),
            this.ctx.drawImage(
              n,
              0,
              0,
              t.intrinsicWidth,
              t.intrinsicHeight,
              s.left,
              s.top,
              s.width,
              s.height
            ),
            this.ctx.restore();
        }
      }),
      (e.prototype.renderNodeContent = function (t) {
        return xA(this, void 0, void 0, function () {
          var r,
            n,
            s,
            i,
            o,
            a,
            I,
            I,
            B,
            l,
            c,
            f,
            O,
            C,
            d,
            S,
            Q,
            _,
            E,
            I,
            b,
            O,
            S;
          return vA(this, function (m) {
            switch (m.label) {
              case 0:
                this.applyEffects(t.getEffects(4)),
                  (r = t.container),
                  (n = t.curves),
                  (s = r.styles),
                  (i = 0),
                  (o = r.textNodes),
                  (m.label = 1);
              case 1:
                return i < o.length
                  ? ((a = o[i]), [4, this.renderTextNode(a, s)])
                  : [3, 4];
              case 2:
                m.sent(), (m.label = 3);
              case 3:
                return i++, [3, 1];
              case 4:
                if (!(r instanceof mB)) return [3, 8];
                m.label = 5;
              case 5:
                return (
                  m.trys.push([5, 7, , 8]), [4, this.context.cache.match(r.src)]
                );
              case 6:
                return (
                  (I = m.sent()), this.renderReplacedElement(r, n, I), [3, 8]
                );
              case 7:
                return (
                  m.sent(),
                  this.context.logger.error("Error loading image " + r.src),
                  [3, 8]
                );
              case 8:
                if (
                  (r instanceof IB &&
                    this.renderReplacedElement(r, n, r.canvas),
                  !(r instanceof yB))
                )
                  return [3, 12];
                m.label = 9;
              case 9:
                return (
                  m.trys.push([9, 11, , 12]),
                  [4, this.context.cache.match(r.svg)]
                );
              case 10:
                return (
                  (I = m.sent()), this.renderReplacedElement(r, n, I), [3, 12]
                );
              case 11:
                return (
                  m.sent(),
                  this.context.logger.error(
                    "Error loading svg " + r.svg.substring(0, 255)
                  ),
                  [3, 12]
                );
              case 12:
                return r instanceof LB && r.tree
                  ? ((B = new e(this.context, {
                      scale: this.options.scale,
                      backgroundColor: r.backgroundColor,
                      x: 0,
                      y: 0,
                      width: r.width,
                      height: r.height,
                    })),
                    [4, B.render(r.tree)])
                  : [3, 14];
              case 13:
                (l = m.sent()),
                  r.width &&
                    r.height &&
                    this.ctx.drawImage(
                      l,
                      0,
                      0,
                      r.width,
                      r.height,
                      r.bounds.left,
                      r.bounds.top,
                      r.bounds.width,
                      r.bounds.height
                    ),
                  (m.label = 14);
              case 14:
                if (
                  (r instanceof ui &&
                    ((c = Math.min(r.bounds.width, r.bounds.height)),
                    r.type === jr
                      ? r.checked &&
                        (this.ctx.save(),
                        this.path([
                          new K(
                            r.bounds.left + c * 0.39363,
                            r.bounds.top + c * 0.79
                          ),
                          new K(
                            r.bounds.left + c * 0.16,
                            r.bounds.top + c * 0.5549
                          ),
                          new K(
                            r.bounds.left + c * 0.27347,
                            r.bounds.top + c * 0.44071
                          ),
                          new K(
                            r.bounds.left + c * 0.39694,
                            r.bounds.top + c * 0.5649
                          ),
                          new K(
                            r.bounds.left + c * 0.72983,
                            r.bounds.top + c * 0.23
                          ),
                          new K(
                            r.bounds.left + c * 0.84,
                            r.bounds.top + c * 0.34085
                          ),
                          new K(
                            r.bounds.left + c * 0.39363,
                            r.bounds.top + c * 0.79
                          ),
                        ]),
                        (this.ctx.fillStyle = UA(Do)),
                        this.ctx.fill(),
                        this.ctx.restore())
                      : r.type === zr &&
                        r.checked &&
                        (this.ctx.save(),
                        this.ctx.beginPath(),
                        this.ctx.arc(
                          r.bounds.left + c / 2,
                          r.bounds.top + c / 2,
                          c / 4,
                          0,
                          Math.PI * 2,
                          !0
                        ),
                        (this.ctx.fillStyle = UA(Do)),
                        this.ctx.fill(),
                        this.ctx.restore())),
                  SC(r) && r.value.length)
                ) {
                  switch (
                    ((f = this.createFontStyle(s)),
                    (O = f[0]),
                    (C = f[1]),
                    (d = this.fontMetrics.getMetrics(O, C).baseline),
                    (this.ctx.font = O),
                    (this.ctx.fillStyle = UA(s.color)),
                    (this.ctx.textBaseline = "alphabetic"),
                    (this.ctx.textAlign = _C(r.styles.textAlign)),
                    (S = tn(r)),
                    (Q = 0),
                    r.styles.textAlign)
                  ) {
                    case 1:
                      Q += S.width / 2;
                      break;
                    case 2:
                      Q += S.width;
                      break;
                  }
                  (_ = S.add(Q, 0, 0, -S.height / 2 + 1)),
                    this.ctx.save(),
                    this.path([
                      new K(S.left, S.top),
                      new K(S.left + S.width, S.top),
                      new K(S.left + S.width, S.top + S.height),
                      new K(S.left, S.top + S.height),
                    ]),
                    this.ctx.clip(),
                    this.renderTextWithLetterSpacing(
                      new Jt(r.value, _),
                      s.letterSpacing,
                      d
                    ),
                    this.ctx.restore(),
                    (this.ctx.textBaseline = "alphabetic"),
                    (this.ctx.textAlign = "left");
                }
                if (!hA(r.styles.display, 2048)) return [3, 20];
                if (r.styles.listStyleImage === null) return [3, 19];
                if (((E = r.styles.listStyleImage), E.type !== 0))
                  return [3, 18];
                (I = void 0), (b = E.url), (m.label = 15);
              case 15:
                return (
                  m.trys.push([15, 17, , 18]), [4, this.context.cache.match(b)]
                );
              case 16:
                return (
                  (I = m.sent()),
                  this.ctx.drawImage(
                    I,
                    r.bounds.left - (I.width + 10),
                    r.bounds.top
                  ),
                  [3, 18]
                );
              case 17:
                return (
                  m.sent(),
                  this.context.logger.error(
                    "Error loading list-style-image " + b
                  ),
                  [3, 18]
                );
              case 18:
                return [3, 20];
              case 19:
                t.listValue &&
                  r.styles.listStyleType !== -1 &&
                  ((O = this.createFontStyle(s)[0]),
                  (this.ctx.font = O),
                  (this.ctx.fillStyle = UA(s.color)),
                  (this.ctx.textBaseline = "middle"),
                  (this.ctx.textAlign = "right"),
                  (S = new pe(
                    r.bounds.left,
                    r.bounds.top + iA(r.styles.paddingTop, r.bounds.width),
                    r.bounds.width,
                    Qo(s.lineHeight, s.fontSize.number) / 2 + 1
                  )),
                  this.renderTextWithLetterSpacing(
                    new Jt(t.listValue, S),
                    s.letterSpacing,
                    Qo(s.lineHeight, s.fontSize.number) / 2 + 2
                  ),
                  (this.ctx.textBaseline = "bottom"),
                  (this.ctx.textAlign = "left")),
                  (m.label = 20);
              case 20:
                return [2];
            }
          });
        });
      }),
      (e.prototype.renderStackContent = function (t) {
        return xA(this, void 0, void 0, function () {
          var r, n, E, s, i, E, o, a, E, B, l, E, c, f, E, C, d, E, Q, _, E;
          return vA(this, function (I) {
            switch (I.label) {
              case 0:
                if (hA(t.element.container.flags, 16)) debugger;
                return [4, this.renderNodeBackgroundAndBorders(t.element)];
              case 1:
                I.sent(), (r = 0), (n = t.negativeZIndex), (I.label = 2);
              case 2:
                return r < n.length
                  ? ((E = n[r]), [4, this.renderStack(E)])
                  : [3, 5];
              case 3:
                I.sent(), (I.label = 4);
              case 4:
                return r++, [3, 2];
              case 5:
                return [4, this.renderNodeContent(t.element)];
              case 6:
                I.sent(), (s = 0), (i = t.nonInlineLevel), (I.label = 7);
              case 7:
                return s < i.length
                  ? ((E = i[s]), [4, this.renderNode(E)])
                  : [3, 10];
              case 8:
                I.sent(), (I.label = 9);
              case 9:
                return s++, [3, 7];
              case 10:
                (o = 0), (a = t.nonPositionedFloats), (I.label = 11);
              case 11:
                return o < a.length
                  ? ((E = a[o]), [4, this.renderStack(E)])
                  : [3, 14];
              case 12:
                I.sent(), (I.label = 13);
              case 13:
                return o++, [3, 11];
              case 14:
                (B = 0), (l = t.nonPositionedInlineLevel), (I.label = 15);
              case 15:
                return B < l.length
                  ? ((E = l[B]), [4, this.renderStack(E)])
                  : [3, 18];
              case 16:
                I.sent(), (I.label = 17);
              case 17:
                return B++, [3, 15];
              case 18:
                (c = 0), (f = t.inlineLevel), (I.label = 19);
              case 19:
                return c < f.length
                  ? ((E = f[c]), [4, this.renderNode(E)])
                  : [3, 22];
              case 20:
                I.sent(), (I.label = 21);
              case 21:
                return c++, [3, 19];
              case 22:
                (C = 0),
                  (d = t.zeroOrAutoZIndexOrTransformedOrOpacity),
                  (I.label = 23);
              case 23:
                return C < d.length
                  ? ((E = d[C]), [4, this.renderStack(E)])
                  : [3, 26];
              case 24:
                I.sent(), (I.label = 25);
              case 25:
                return C++, [3, 23];
              case 26:
                (Q = 0), (_ = t.positiveZIndex), (I.label = 27);
              case 27:
                return Q < _.length
                  ? ((E = _[Q]), [4, this.renderStack(E)])
                  : [3, 30];
              case 28:
                I.sent(), (I.label = 29);
              case 29:
                return Q++, [3, 27];
              case 30:
                return [2];
            }
          });
        });
      }),
      (e.prototype.mask = function (t) {
        this.ctx.beginPath(),
          this.ctx.moveTo(0, 0),
          this.ctx.lineTo(this.canvas.width, 0),
          this.ctx.lineTo(this.canvas.width, this.canvas.height),
          this.ctx.lineTo(0, this.canvas.height),
          this.ctx.lineTo(0, 0),
          this.formatPath(t.slice(0).reverse()),
          this.ctx.closePath();
      }),
      (e.prototype.path = function (t) {
        this.ctx.beginPath(), this.formatPath(t), this.ctx.closePath();
      }),
      (e.prototype.formatPath = function (t) {
        var r = this;
        t.forEach(function (n, s) {
          var i = XA(n) ? n.start : n;
          s === 0 ? r.ctx.moveTo(i.x, i.y) : r.ctx.lineTo(i.x, i.y),
            XA(n) &&
              r.ctx.bezierCurveTo(
                n.startControl.x,
                n.startControl.y,
                n.endControl.x,
                n.endControl.y,
                n.end.x,
                n.end.y
              );
        });
      }),
      (e.prototype.renderRepeat = function (t, r, n, s) {
        this.path(t),
          (this.ctx.fillStyle = r),
          this.ctx.translate(n, s),
          this.ctx.fill(),
          this.ctx.translate(-n, -s);
      }),
      (e.prototype.resizeImage = function (t, r, n) {
        var s;
        if (t.width === r && t.height === n) return t;
        var i =
            (s = this.canvas.ownerDocument) !== null && s !== void 0
              ? s
              : document,
          o = i.createElement("canvas");
        (o.width = Math.max(1, r)), (o.height = Math.max(1, n));
        var a = o.getContext("2d");
        return a.drawImage(t, 0, 0, t.width, t.height, 0, 0, r, n), o;
      }),
      (e.prototype.renderBackgroundImage = function (t) {
        return xA(this, void 0, void 0, function () {
          var r, n, s, i, o, a;
          return vA(this, function (B) {
            switch (B.label) {
              case 0:
                (r = t.styles.backgroundImage.length - 1),
                  (n = function (l) {
                    var c,
                      f,
                      C,
                      k,
                      q,
                      W,
                      J,
                      lA,
                      x,
                      d,
                      k,
                      q,
                      W,
                      J,
                      lA,
                      Q,
                      _,
                      E,
                      I,
                      b,
                      O,
                      S,
                      m,
                      N,
                      x,
                      D,
                      k,
                      tA,
                      aA,
                      J,
                      lA,
                      ZA,
                      q,
                      W,
                      j,
                      dA,
                      OA,
                      bA,
                      CA,
                      VA,
                      Qe,
                      jA;
                    return vA(this, function (HA) {
                      switch (HA.label) {
                        case 0:
                          if (l.type !== 0) return [3, 5];
                          (c = void 0), (f = l.url), (HA.label = 1);
                        case 1:
                          return (
                            HA.trys.push([1, 3, , 4]),
                            [4, s.context.cache.match(f)]
                          );
                        case 2:
                          return (c = HA.sent()), [3, 4];
                        case 3:
                          return (
                            HA.sent(),
                            s.context.logger.error(
                              "Error loading background-image " + f
                            ),
                            [3, 4]
                          );
                        case 4:
                          return (
                            c &&
                              ((C = ts(t, r, [
                                c.width,
                                c.height,
                                c.width / c.height,
                              ])),
                              (k = C[0]),
                              (q = C[1]),
                              (W = C[2]),
                              (J = C[3]),
                              (lA = C[4]),
                              (x = s.ctx.createPattern(
                                s.resizeImage(c, J, lA),
                                "repeat"
                              )),
                              s.renderRepeat(k, x, q, W)),
                            [3, 6]
                          );
                        case 5:
                          UQ(l)
                            ? ((d = ts(t, r, [null, null, null])),
                              (k = d[0]),
                              (q = d[1]),
                              (W = d[2]),
                              (J = d[3]),
                              (lA = d[4]),
                              (Q = wQ(l.angle, J, lA)),
                              (_ = Q[0]),
                              (E = Q[1]),
                              (I = Q[2]),
                              (b = Q[3]),
                              (O = Q[4]),
                              (S = document.createElement("canvas")),
                              (S.width = J),
                              (S.height = lA),
                              (m = S.getContext("2d")),
                              (N = m.createLinearGradient(E, b, I, O)),
                              go(l.stops, _).forEach(function (ie) {
                                return N.addColorStop(ie.stop, UA(ie.color));
                              }),
                              (m.fillStyle = N),
                              m.fillRect(0, 0, J, lA),
                              J > 0 &&
                                lA > 0 &&
                                ((x = s.ctx.createPattern(S, "repeat")),
                                s.renderRepeat(k, x, q, W)))
                            : FQ(l) &&
                              ((D = ts(t, r, [null, null, null])),
                              (k = D[0]),
                              (tA = D[1]),
                              (aA = D[2]),
                              (J = D[3]),
                              (lA = D[4]),
                              (ZA =
                                l.position.length === 0 ? [ai] : l.position),
                              (q = iA(ZA[0], J)),
                              (W = iA(ZA[ZA.length - 1], lA)),
                              (j = QQ(l, q, W, J, lA)),
                              (dA = j[0]),
                              (OA = j[1]),
                              dA > 0 &&
                                OA > 0 &&
                                ((bA = s.ctx.createRadialGradient(
                                  tA + q,
                                  aA + W,
                                  0,
                                  tA + q,
                                  aA + W,
                                  dA
                                )),
                                go(l.stops, dA * 2).forEach(function (ie) {
                                  return bA.addColorStop(ie.stop, UA(ie.color));
                                }),
                                s.path(k),
                                (s.ctx.fillStyle = bA),
                                dA !== OA
                                  ? ((CA =
                                      t.bounds.left + 0.5 * t.bounds.width),
                                    (VA = t.bounds.top + 0.5 * t.bounds.height),
                                    (Qe = OA / dA),
                                    (jA = 1 / Qe),
                                    s.ctx.save(),
                                    s.ctx.translate(CA, VA),
                                    s.ctx.transform(1, 0, 0, Qe, 0, 0),
                                    s.ctx.translate(-CA, -VA),
                                    s.ctx.fillRect(
                                      tA,
                                      jA * (aA - VA) + VA,
                                      J,
                                      lA * jA
                                    ),
                                    s.ctx.restore())
                                  : s.ctx.fill())),
                            (HA.label = 6);
                        case 6:
                          return r--, [2];
                      }
                    });
                  }),
                  (s = this),
                  (i = 0),
                  (o = t.styles.backgroundImage.slice(0).reverse()),
                  (B.label = 1);
              case 1:
                return i < o.length ? ((a = o[i]), [5, n(a)]) : [3, 4];
              case 2:
                B.sent(), (B.label = 3);
              case 3:
                return i++, [3, 1];
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.prototype.renderSolidBorder = function (t, r, n) {
        return xA(this, void 0, void 0, function () {
          return vA(this, function (s) {
            return (
              this.path(Jo(n, r)),
              (this.ctx.fillStyle = UA(t)),
              this.ctx.fill(),
              [2]
            );
          });
        });
      }),
      (e.prototype.renderDoubleBorder = function (t, r, n, s) {
        return xA(this, void 0, void 0, function () {
          var i, o;
          return vA(this, function (a) {
            switch (a.label) {
              case 0:
                return r < 3 ? [4, this.renderSolidBorder(t, n, s)] : [3, 2];
              case 1:
                return a.sent(), [2];
              case 2:
                return (
                  (i = HC(s, n)),
                  this.path(i),
                  (this.ctx.fillStyle = UA(t)),
                  this.ctx.fill(),
                  (o = vC(s, n)),
                  this.path(o),
                  this.ctx.fill(),
                  [2]
                );
            }
          });
        });
      }),
      (e.prototype.renderNodeBackgroundAndBorders = function (t) {
        return xA(this, void 0, void 0, function () {
          var r,
            n,
            s,
            i,
            o,
            a,
            B,
            l,
            c = this;
          return vA(this, function (f) {
            switch (f.label) {
              case 0:
                return (
                  this.applyEffects(t.getEffects(2)),
                  (r = t.container.styles),
                  (n = !Se(r.backgroundColor) || r.backgroundImage.length),
                  (s = [
                    {
                      style: r.borderTopStyle,
                      color: r.borderTopColor,
                      width: r.borderTopWidth,
                    },
                    {
                      style: r.borderRightStyle,
                      color: r.borderRightColor,
                      width: r.borderRightWidth,
                    },
                    {
                      style: r.borderBottomStyle,
                      color: r.borderBottomColor,
                      width: r.borderBottomWidth,
                    },
                    {
                      style: r.borderLeftStyle,
                      color: r.borderLeftColor,
                      width: r.borderLeftWidth,
                    },
                  ]),
                  (i = OC(ct(r.backgroundClip, 0), t.curves)),
                  n || r.boxShadow.length
                    ? (this.ctx.save(),
                      this.path(i),
                      this.ctx.clip(),
                      Se(r.backgroundColor) ||
                        ((this.ctx.fillStyle = UA(r.backgroundColor)),
                        this.ctx.fill()),
                      [4, this.renderBackgroundImage(t.container)])
                    : [3, 2]
                );
              case 1:
                f.sent(),
                  this.ctx.restore(),
                  r.boxShadow
                    .slice(0)
                    .reverse()
                    .forEach(function (C) {
                      c.ctx.save();
                      var d = An(t.curves),
                        Q = C.inset ? 0 : TC,
                        _ = pC(
                          d,
                          -Q + (C.inset ? 1 : -1) * C.spread.number,
                          (C.inset ? 1 : -1) * C.spread.number,
                          C.spread.number * (C.inset ? -2 : 2),
                          C.spread.number * (C.inset ? -2 : 2)
                        );
                      C.inset
                        ? (c.path(d), c.ctx.clip(), c.mask(_))
                        : (c.mask(d), c.ctx.clip(), c.path(_)),
                        (c.ctx.shadowOffsetX = C.offsetX.number + Q),
                        (c.ctx.shadowOffsetY = C.offsetY.number),
                        (c.ctx.shadowColor = UA(C.color)),
                        (c.ctx.shadowBlur = C.blur.number),
                        (c.ctx.fillStyle = C.inset
                          ? UA(C.color)
                          : "rgba(0,0,0,1)"),
                        c.ctx.fill(),
                        c.ctx.restore();
                    }),
                  (f.label = 2);
              case 2:
                (o = 0), (a = 0), (B = s), (f.label = 3);
              case 3:
                return a < B.length
                  ? ((l = B[a]),
                    l.style !== 0 && !Se(l.color) && l.width > 0
                      ? l.style !== 2
                        ? [3, 5]
                        : [
                            4,
                            this.renderDashedDottedBorder(
                              l.color,
                              l.width,
                              o,
                              t.curves,
                              2
                            ),
                          ]
                      : [3, 11])
                  : [3, 13];
              case 4:
                return f.sent(), [3, 11];
              case 5:
                return l.style !== 3
                  ? [3, 7]
                  : [
                      4,
                      this.renderDashedDottedBorder(
                        l.color,
                        l.width,
                        o,
                        t.curves,
                        3
                      ),
                    ];
              case 6:
                return f.sent(), [3, 11];
              case 7:
                return l.style !== 4
                  ? [3, 9]
                  : [4, this.renderDoubleBorder(l.color, l.width, o, t.curves)];
              case 8:
                return f.sent(), [3, 11];
              case 9:
                return [4, this.renderSolidBorder(l.color, o, t.curves)];
              case 10:
                f.sent(), (f.label = 11);
              case 11:
                o++, (f.label = 12);
              case 12:
                return a++, [3, 3];
              case 13:
                return [2];
            }
          });
        });
      }),
      (e.prototype.renderDashedDottedBorder = function (t, r, n, s, i) {
        return xA(this, void 0, void 0, function () {
          var o, a, B, l, c, f, C, d, Q, _, E, I, b, O, S, m, S, m;
          return vA(this, function (N) {
            return (
              this.ctx.save(),
              (o = mC(s, n)),
              (a = Jo(s, n)),
              i === 2 && (this.path(a), this.ctx.clip()),
              XA(a[0])
                ? ((B = a[0].start.x), (l = a[0].start.y))
                : ((B = a[0].x), (l = a[0].y)),
              XA(a[1])
                ? ((c = a[1].end.x), (f = a[1].end.y))
                : ((c = a[1].x), (f = a[1].y)),
              n === 0 || n === 2
                ? (C = Math.abs(B - c))
                : (C = Math.abs(l - f)),
              this.ctx.beginPath(),
              i === 3 ? this.formatPath(o) : this.formatPath(a.slice(0, 2)),
              (d = r < 3 ? r * 3 : r * 2),
              (Q = r < 3 ? r * 2 : r),
              i === 3 && ((d = r), (Q = r)),
              (_ = !0),
              C <= d * 2
                ? (_ = !1)
                : C <= d * 2 + Q
                ? ((E = C / (2 * d + Q)), (d *= E), (Q *= E))
                : ((I = Math.floor((C + Q) / (d + Q))),
                  (b = (C - I * d) / (I - 1)),
                  (O = (C - (I + 1) * d) / I),
                  (Q = O <= 0 || Math.abs(Q - b) < Math.abs(Q - O) ? b : O)),
              _ &&
                (i === 3
                  ? this.ctx.setLineDash([0, d + Q])
                  : this.ctx.setLineDash([d, Q])),
              i === 3
                ? ((this.ctx.lineCap = "round"), (this.ctx.lineWidth = r))
                : (this.ctx.lineWidth = r * 2 + 1.1),
              (this.ctx.strokeStyle = UA(t)),
              this.ctx.stroke(),
              this.ctx.setLineDash([]),
              i === 2 &&
                (XA(a[0]) &&
                  ((S = a[3]),
                  (m = a[0]),
                  this.ctx.beginPath(),
                  this.formatPath([
                    new K(S.end.x, S.end.y),
                    new K(m.start.x, m.start.y),
                  ]),
                  this.ctx.stroke()),
                XA(a[1]) &&
                  ((S = a[1]),
                  (m = a[2]),
                  this.ctx.beginPath(),
                  this.formatPath([
                    new K(S.end.x, S.end.y),
                    new K(m.start.x, m.start.y),
                  ]),
                  this.ctx.stroke())),
              this.ctx.restore(),
              [2]
            );
          });
        });
      }),
      (e.prototype.render = function (t) {
        return xA(this, void 0, void 0, function () {
          var r;
          return vA(this, function (n) {
            switch (n.label) {
              case 0:
                return (
                  this.options.backgroundColor &&
                    ((this.ctx.fillStyle = UA(this.options.backgroundColor)),
                    this.ctx.fillRect(
                      this.options.x,
                      this.options.y,
                      this.options.width,
                      this.options.height
                    )),
                  (r = EC(t)),
                  [4, this.renderStack(r)]
                );
              case 1:
                return n.sent(), this.applyEffects([]), [2, this.canvas];
            }
          });
        });
      }),
      e
    );
  })(YB),
  SC = function (A) {
    return A instanceof xB || A instanceof KB
      ? !0
      : A instanceof ui && A.type !== zr && A.type !== jr;
  },
  OC = function (A, e) {
    switch (A) {
      case 0:
        return An(e);
      case 2:
        return hC(e);
      case 1:
      default:
        return en(e);
    }
  },
  _C = function (A) {
    switch (A) {
      case 1:
        return "center";
      case 2:
        return "right";
      case 0:
      default:
        return "left";
    }
  },
  MC = ["-apple-system", "system-ui"],
  RC = function (A) {
    return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
      ? A.filter(function (e) {
          return MC.indexOf(e) === -1;
        })
      : A;
  },
  GC = (function (A) {
    se(e, A);
    function e(t, r) {
      var n = A.call(this, t, r) || this;
      return (
        (n.canvas = r.canvas ? r.canvas : document.createElement("canvas")),
        (n.ctx = n.canvas.getContext("2d")),
        (n.options = r),
        (n.canvas.width = Math.floor(r.width * r.scale)),
        (n.canvas.height = Math.floor(r.height * r.scale)),
        (n.canvas.style.width = r.width + "px"),
        (n.canvas.style.height = r.height + "px"),
        n.ctx.scale(n.options.scale, n.options.scale),
        n.ctx.translate(-r.x, -r.y),
        n.context.logger.debug(
          "EXPERIMENTAL ForeignObject renderer initialized (" +
            r.width +
            "x" +
            r.height +
            " at " +
            r.x +
            "," +
            r.y +
            ") with scale " +
            r.scale
        ),
        n
      );
    }
    return (
      (e.prototype.render = function (t) {
        return xA(this, void 0, void 0, function () {
          var r, n;
          return vA(this, function (s) {
            switch (s.label) {
              case 0:
                return (
                  (r = Ss(
                    this.options.width * this.options.scale,
                    this.options.height * this.options.scale,
                    this.options.scale,
                    this.options.scale,
                    t
                  )),
                  [4, VC(r)]
                );
              case 1:
                return (
                  (n = s.sent()),
                  this.options.backgroundColor &&
                    ((this.ctx.fillStyle = UA(this.options.backgroundColor)),
                    this.ctx.fillRect(
                      0,
                      0,
                      this.options.width * this.options.scale,
                      this.options.height * this.options.scale
                    )),
                  this.ctx.drawImage(
                    n,
                    -this.options.x * this.options.scale,
                    -this.options.y * this.options.scale
                  ),
                  [2, this.canvas]
                );
            }
          });
        });
      }),
      e
    );
  })(YB),
  VC = function (A) {
    return new Promise(function (e, t) {
      var r = new Image();
      (r.onload = function () {
        e(r);
      }),
        (r.onerror = t),
        (r.src =
          "data:image/svg+xml;charset=utf-8," +
          encodeURIComponent(new XMLSerializer().serializeToString(A)));
    });
  },
  NC = (function () {
    function A(e) {
      var t = e.id,
        r = e.enabled;
      (this.id = t), (this.enabled = r), (this.start = Date.now());
    }
    return (
      (A.prototype.debug = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.enabled &&
          (typeof window < "u" &&
          window.console &&
          typeof console.debug == "function"
            ? console.debug.apply(
                console,
                cr([this.id, this.getTime() + "ms"], e)
              )
            : this.info.apply(this, e));
      }),
      (A.prototype.getTime = function () {
        return Date.now() - this.start;
      }),
      (A.prototype.info = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.enabled &&
          typeof window < "u" &&
          window.console &&
          typeof console.info == "function" &&
          console.info.apply(console, cr([this.id, this.getTime() + "ms"], e));
      }),
      (A.prototype.warn = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.enabled &&
          (typeof window < "u" &&
          window.console &&
          typeof console.warn == "function"
            ? console.warn.apply(
                console,
                cr([this.id, this.getTime() + "ms"], e)
              )
            : this.info.apply(this, e));
      }),
      (A.prototype.error = function () {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        this.enabled &&
          (typeof window < "u" &&
          window.console &&
          typeof console.error == "function"
            ? console.error.apply(
                console,
                cr([this.id, this.getTime() + "ms"], e)
              )
            : this.info.apply(this, e));
      }),
      (A.instances = {}),
      A
    );
  })(),
  kC = (function () {
    function A(e, t) {
      var r;
      (this.windowBounds = t),
        (this.instanceName = "#" + A.instanceCount++),
        (this.logger = new NC({ id: this.instanceName, enabled: e.logging })),
        (this.cache =
          (r = e.cache) !== null && r !== void 0 ? r : new BC(this, e));
    }
    return (A.instanceCount = 1), A;
  })(),
  PC = function (A, e) {
    return e === void 0 && (e = {}), XC(A, e);
  };
typeof window < "u" && NB.setContext(window);
var XC = function (A, e) {
    return xA(void 0, void 0, void 0, function () {
      var t,
        r,
        n,
        s,
        i,
        o,
        a,
        B,
        l,
        c,
        f,
        C,
        d,
        Q,
        _,
        E,
        I,
        b,
        O,
        S,
        N,
        m,
        N,
        x,
        D,
        k,
        tA,
        aA,
        J,
        lA,
        ZA,
        q,
        W,
        j,
        dA,
        OA,
        bA,
        CA,
        VA,
        Qe;
      return vA(this, function (jA) {
        switch (jA.label) {
          case 0:
            if (!A || typeof A != "object")
              return [
                2,
                Promise.reject("Invalid element provided as first argument"),
              ];
            if (((t = A.ownerDocument), !t))
              throw new Error("Element is not attached to a Document");
            if (((r = t.defaultView), !r))
              throw new Error("Document is not attached to a Window");
            return (
              (n = {
                allowTaint:
                  (x = e.allowTaint) !== null && x !== void 0 ? x : !1,
                imageTimeout:
                  (D = e.imageTimeout) !== null && D !== void 0 ? D : 15e3,
                proxy: e.proxy,
                useCORS: (k = e.useCORS) !== null && k !== void 0 ? k : !1,
              }),
              (s = Us(
                {
                  logging: (tA = e.logging) !== null && tA !== void 0 ? tA : !0,
                  cache: e.cache,
                },
                n
              )),
              (i = {
                windowWidth:
                  (aA = e.windowWidth) !== null && aA !== void 0
                    ? aA
                    : r.innerWidth,
                windowHeight:
                  (J = e.windowHeight) !== null && J !== void 0
                    ? J
                    : r.innerHeight,
                scrollX:
                  (lA = e.scrollX) !== null && lA !== void 0
                    ? lA
                    : r.pageXOffset,
                scrollY:
                  (ZA = e.scrollY) !== null && ZA !== void 0
                    ? ZA
                    : r.pageYOffset,
              }),
              (o = new pe(i.scrollX, i.scrollY, i.windowWidth, i.windowHeight)),
              (a = new kC(s, o)),
              (B =
                (q = e.foreignObjectRendering) !== null && q !== void 0
                  ? q
                  : !1),
              (l = {
                allowTaint:
                  (W = e.allowTaint) !== null && W !== void 0 ? W : !1,
                onclone: e.onclone,
                ignoreElements: e.ignoreElements,
                inlineImages: B,
                copyStyles: B,
              }),
              a.logger.debug(
                "Starting document clone with size " +
                  o.width +
                  "x" +
                  o.height +
                  " scrolled to " +
                  -o.left +
                  "," +
                  -o.top
              ),
              (c = new ko(a, A, l)),
              (f = c.clonedReferenceElement),
              f
                ? [4, c.toIFrame(t, o)]
                : [2, Promise.reject("Unable to find element in cloned iframe")]
            );
          case 1:
            return (
              (C = jA.sent()),
              (d = fi(f) || Jd(f) ? pg(f.ownerDocument) : Qn(a, f)),
              (Q = d.width),
              (_ = d.height),
              (E = d.left),
              (I = d.top),
              (b = JC(a, f, e.backgroundColor)),
              (O = {
                canvas: e.canvas,
                backgroundColor: b,
                scale:
                  (dA =
                    (j = e.scale) !== null && j !== void 0
                      ? j
                      : r.devicePixelRatio) !== null && dA !== void 0
                    ? dA
                    : 1,
                x: ((OA = e.x) !== null && OA !== void 0 ? OA : 0) + E,
                y: ((bA = e.y) !== null && bA !== void 0 ? bA : 0) + I,
                width:
                  (CA = e.width) !== null && CA !== void 0 ? CA : Math.ceil(Q),
                height:
                  (VA = e.height) !== null && VA !== void 0 ? VA : Math.ceil(_),
              }),
              B
                ? (a.logger.debug(
                    "Document cloned, using foreign object rendering"
                  ),
                  (N = new GC(a, O)),
                  [4, N.render(f)])
                : [3, 3]
            );
          case 2:
            return (S = jA.sent()), [3, 5];
          case 3:
            return (
              a.logger.debug(
                "Document cloned, element located at " +
                  E +
                  "," +
                  I +
                  " with size " +
                  Q +
                  "x" +
                  _ +
                  " using computed rendering"
              ),
              a.logger.debug("Starting DOM parsing"),
              (m = DB(a, f)),
              b === m.styles.backgroundColor &&
                (m.styles.backgroundColor = Ue.TRANSPARENT),
              a.logger.debug(
                "Starting renderer for element at " +
                  O.x +
                  "," +
                  O.y +
                  " with size " +
                  O.width +
                  "x" +
                  O.height
              ),
              (N = new DC(a, O)),
              [4, N.render(m)]
            );
          case 4:
            (S = jA.sent()), (jA.label = 5);
          case 5:
            return (
              (!((Qe = e.removeContainer) !== null && Qe !== void 0) || Qe) &&
                (ko.destroy(C) ||
                  a.logger.error(
                    "Cannot detach cloned iframe as it is not in the DOM anymore"
                  )),
              a.logger.debug("Finished rendering"),
              [2, S]
            );
        }
      });
    });
  },
  JC = function (A, e, t) {
    var r = e.ownerDocument,
      n = r.documentElement
        ? Pt(A, getComputedStyle(r.documentElement).backgroundColor)
        : Ue.TRANSPARENT,
      s = r.body
        ? Pt(A, getComputedStyle(r.body).backgroundColor)
        : Ue.TRANSPARENT,
      i =
        typeof t == "string"
          ? Pt(A, t)
          : t === null
          ? Ue.TRANSPARENT
          : 4294967295;
    return e === r.documentElement ? (Se(n) ? (Se(s) ? i : s) : n) : i;
  };
Hu(Fg).mount("#app");
function WC(A) {
  var e = $("<a style='display:none' id='js-downloder'>")
    .attr("href", A)
    .attr("download", "zdjecie_profilowe.png")
    .appendTo("body");
  e[0].click(), e.remove();
}
function YC(A) {
  PC(A).then(function (e) {
    WC(e.toDataURL("image/png"));
  });
}
$("#btnDownload").click(function () {
  var A = document.querySelector("#filter");
  YC(A);
});
