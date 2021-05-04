!(function (t, e) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? (exports.tapspace = e()) : (t.tapspace = e());
})("undefined" != typeof self ? self : this, function () {
    return (function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = (n[r] = { i: r, l: !1, exports: {} });
            return t[r].call(i.exports, i, i.exports, e), (i.l = !0), i.exports;
        }
        var n = {};
        return (
            (e.m = t),
            (e.c = n),
            (e.d = function (t, n, r) {
                e.o(t, n) || Object.defineProperty(t, n, { configurable: !1, enumerable: !0, get: r });
            }),
            (e.n = function (t) {
                var n =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return e.d(n, "a", n), n;
            }),
            (e.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (e.p = ""),
            e((e.s = 24))
        );
    })([
        function (t, e, n) {
            "use strict";
            var r = Object.prototype.hasOwnProperty,
                i = Object.prototype.toString,
                o = function (t) {
                    return "function" == typeof Array.isArray ? Array.isArray(t) : "[object Array]" === i.call(t);
                },
                s = function (t) {
                    if (!t || "[object Object]" !== i.call(t)) return !1;
                    var e = r.call(t, "constructor"),
                        n = t.constructor && t.constructor.prototype && r.call(t.constructor.prototype, "isPrototypeOf");
                    if (t.constructor && !e && !n) return !1;
                    var o;
                    for (o in t);
                    return void 0 === o || r.call(t, o);
                };
            t.exports = function t() {
                var e,
                    n,
                    r,
                    i,
                    a,
                    h,
                    u = arguments[0],
                    l = 1,
                    f = arguments.length,
                    c = !1;
                for ("boolean" == typeof u && ((c = u), (u = arguments[1] || {}), (l = 2)), (null == u || ("object" != typeof u && "function" != typeof u)) && (u = {}); l < f; ++l)
                    if (null != (e = arguments[l]))
                        for (n in e) (r = u[n]), (i = e[n]), u !== i && (c && i && (s(i) || (a = o(i))) ? (a ? ((a = !1), (h = r && o(r) ? r : [])) : (h = r && s(r) ? r : {}), (u[n] = t(c, h, i))) : void 0 !== i && (u[n] = i));
                return u;
            };
        },
        function (t, e) {
            var n = function (t, e, n, r) {
                (this.s = t), (this.r = e), (this.tx = n), (this.ty = r);
            };
            n.EPSILON = 1e-10;
            var r = n.prototype;
            (r.almostEquals = r.almostEqual = function (t, e) {
                return "number" != typeof e && (e = n.EPSILON), Math.abs(this.s - t.s) + Math.abs(this.r - t.r) + Math.abs(this.tx - t.tx) + Math.abs(this.ty - t.ty) <= e;
            }),
                (r.equal = r.equals = function (t) {
                    return this.s === t.s && this.r === t.r && this.tx === t.tx && this.ty === t.ty;
                }),
                (r.getMatrix = function () {
                    return { a: this.s, b: this.r, c: -this.r, d: this.s, e: this.tx, f: this.ty };
                }),
                (r.getRotation = function () {
                    return Math.atan2(this.r, this.s);
                }),
                (r.getScale = function () {
                    return Math.sqrt(this.r * this.r + this.s * this.s);
                }),
                (r.getTranslation = function () {
                    return [this.tx, this.ty];
                }),
                (r.toArray = function () {
                    return [this.s, this.r, this.tx, this.ty];
                }),
                (r.transform = function (t) {
                    if ("number" == typeof t[0]) return [this.s * t[0] - this.r * t[1] + this.tx, this.r * t[0] + this.s * t[1] + this.ty];
                    var e,
                        n = [];
                    for (e = 0; e < t.length; e += 1) n.push([this.s * t[e][0] - this.r * t[e][1] + this.tx, this.r * t[e][0] + this.s * t[e][1] + this.ty]);
                    return n;
                }),
                (r.inverse = function () {
                    var t = this.s * this.s + this.r * this.r;
                    if (Math.abs(t) < n.EPSILON) throw new Error("Singular transformations cannot be inversed.");
                    var e = this.s / t,
                        r = -this.r / t,
                        i = (-this.s * this.tx - this.r * this.ty) / t,
                        o = (this.r * this.tx - this.s * this.ty) / t;
                    return new n(e, r, i, o);
                }),
                (r.translateBy = function (t, e) {
                    return new n(this.s, this.r, this.tx + t, this.ty + e);
                }),
                (r.scaleBy = function (t, e) {
                    var r, i, o;
                    return (r = t), void 0 === e ? (i = o = 0) : ((i = e[0]), (o = e[1])), new n(r * this.s, r * this.r, r * this.tx + (1 - r) * i, r * this.ty + (1 - r) * o);
                }),
                (r.rotateBy = function (t, e) {
                    var r, i, o, s, a, h, u, l;
                    return (
                        (r = Math.cos(t)),
                        (i = Math.sin(t)),
                        void 0 === e ? (o = s = 0) : ((o = e[0]), (s = e[1])),
                        (a = this.s * r - this.r * i),
                        (h = this.s * i + this.r * r),
                        (u = (this.tx - o) * r - (this.ty - s) * i + o),
                        (l = (this.tx - o) * i + (this.ty - s) * r + s),
                        new n(a, h, u, l)
                    );
                }),
                (r.multiplyRight = r.multiplyBy = function (t) {
                    var e = t,
                        r = this.s * e.s - this.r * e.r,
                        i = this.s * e.r + this.r * e.s,
                        o = this.s * e.tx - this.r * e.ty + this.tx,
                        s = this.r * e.tx + this.s * e.ty + this.ty;
                    return new n(r, i, o, s);
                }),
                (n.IDENTITY = new n(1, 0, 0, 0)),
                (n.R90 = new n(0, 1, 0, 0)),
                (n.R180 = new n(-1, 0, 0, 0)),
                (n.R270 = new n(0, -1, 0, 0)),
                (n.X2 = new n(2, 0, 0, 0)),
                (t.exports = n);
        },
        function (t, e, n) {
            var r = n(4),
                i = function (t, e) {
                    if (void 0 === e) throw new Error("Missing (x, y) parameters");
                    (this.x = t), (this.y = e);
                };
            i.createFromPolar = function (t, e) {
                return new i(t * Math.cos(e), t * Math.sin(e));
            };
            var o = i.prototype;
            (o.add = function (t) {
                return new i(this.x + t.x, this.y + t.y);
            }),
                (o.almostEqual = function (t) {
                    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) < r;
                }),
                (o.changeBasis = function (t, e) {
                    var n = t.y * e.x - t.x * e.y;
                    if (Math.abs(n) < r) throw new Error("Basis vectors must be linearly independent.");
                    return new i((this.y * e.x - this.x * e.y) / n, (this.x * t.y - this.y * t.x) / n);
                }),
                (o.changeFromBasis = function (t, e) {
                    var n = t.y * e.x - t.x * e.y;
                    if (Math.abs(n) < r) throw new Error("Basis vectors must be linearly independent.");
                    return new i(this.x * t.x + this.y * e.x, this.x * t.y + this.y * e.y);
                }),
                (o.distance = function (t) {
                    var e = this.x - t.x,
                        n = this.y - t.y;
                    return Math.sqrt(e * e + n * n);
                }),
                (o.equal = o.equals = function (t) {
                    return this.x === t.x && this.y === t.y;
                }),
                (o.getRotation = function () {
                    return Math.atan2(this.y, this.x);
                }),
                (o.getMagnitude = function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }),
                (o.isIndependent = function (t) {
                    return this.x * t.y - this.y * t.x != 0;
                }),
                (o.opposite = function () {
                    return new i(-this.x, -this.y);
                }),
                (o.max = function (t) {
                    var e = Math.max(this.x, t.x),
                        n = Math.max(this.y, t.y);
                    return new i(e, n);
                }),
                (o.min = function (t) {
                    var e = Math.min(this.x, t.x),
                        n = Math.min(this.y, t.y);
                    return new i(e, n);
                }),
                (o.multiply = function (t) {
                    return new i(this.x * t, this.y * t);
                }),
                (o.norm = function () {
                    return Math.sqrt(this.x * this.x + this.y * this.y);
                }),
                (o.translate = o.offset = function (t, e) {
                    return new i(this.x + t, this.y + e);
                }),
                (o.polarOffset = function (t, e) {
                    var n = this.x + t * Math.cos(e),
                        r = this.y + t * Math.sin(e);
                    return new i(n, r);
                }),
                (o.rotate = function (t) {
                    var e = this.x * Math.cos(t) - this.y * Math.sin(t),
                        n = this.x * Math.sin(t) + this.y * Math.cos(t);
                    return new i(e, n);
                }),
                (o.subtract = function (t) {
                    return new i(this.x - t.x, this.y - t.y);
                }),
                (o.toArray = function () {
                    return [this.x, this.y];
                }),
                (o.transform = function (t) {
                    var e = this.x * t.s - this.y * t.r + t.tx,
                        n = this.x * t.r + this.y * t.s + t.ty;
                    return new i(e, n);
                }),
                (t.exports = i);
        },
        function (t, e, n) {
            var r = n(2),
                i = n(13),
                o = function (t, e) {
                    if (void 0 === t) throw new Error("a Vector is required");
                    this._vec = void 0 === e ? t : t.transform(e.getGlobalTransform());
                },
                s = o.prototype;
            (s.add = function (t) {
                return new o(this._vec.add(t._vec));
            }),
                (s.almostEqual = function (t) {
                    return this._vec.almostEqual(t._vec);
                }),
                (s.distance = function (t) {
                    return new i(this._vec.distance(t._vec));
                }),
                (s.equal = s.equals = function (t) {
                    return this._vec.equals(t._vec);
                }),
                (s.multiply = function (t) {
                    return new o(this._vec.multiply(t));
                }),
                (s.norm = function () {
                    return new i(this._vec.norm());
                }),
                (s.offset = function (t, e, n) {
                    var i, s;
                    return (i = new r(t, e)), (s = n ? i.transform(n.getGlobalTransform()) : i), new o(this._vec.add(s));
                }),
                (s.polarOffset = function (t, e, n) {
                    var i, s, a, h;
                    return (i = t * Math.cos(e)), (s = t * Math.sin(e)), (a = new r(i, s)), (h = n ? a.transform(n.getGlobalTransform()) : a), new o(this._vec.add(h));
                }),
                (s.to = function (t) {
                    if (null === t || t.isRoot()) return this._vec;
                    var e = t.getGlobalTransform().inverse();
                    return this._vec.transform(e);
                }),
                (s.toSpace = function () {
                    return this._vec;
                }),
                (s.transform = function (t) {
                    return new o(this._vec.transform(t.toSpace()));
                }),
                (t.exports = o);
        },
        function (t, e, n) {
            t.exports = n(5).EPSILON;
        },
        function (t, e, n) {
            var r = n(12);
            t.exports = r.Transform;
        },
        function (t, e, n) {
            var r = n(2),
                i = n(4),
                o = n(35),
                s = function (t) {
                    void 0 === t && (t = []), (this._seg = t), (this.length = t.length);
                },
                a = s.prototype;
            (a.add = function (t) {
                if (t.hasOwnProperty("_seg")) return new s(this._seg.concat(t._seg));
                if (t.hasOwnProperty("x")) return new s(this._seg.concat([t]));
                throw new Error("Invalid Path or Vector");
            }),
                (a.almostEqual = function (t) {
                    if (this._seg.length === t._seg.length) {
                        for (var e = 0; e < this._seg.length; e += 1) if (!this._seg[e].almostEqual(t._seg[e])) return !1;
                        return !0;
                    }
                    return !1;
                }),
                (a.atMid = function () {
                    var t,
                        e,
                        n = this._seg,
                        o = 0,
                        s = 0,
                        a = 0;
                    if (0 === n.length) return null;
                    if (1 === n.length) return this._seg[0];
                    for (t = 0; t + 1 < n.length; t += 1) (e = n[t].x * n[t + 1].y - n[t + 1].x * n[t].y), (o += (n[t].x + n[t + 1].x) * e), (s += (n[t].y + n[t + 1].y) * e), (a += e);
                    if (((e = n[t].x * n[0].y - n[0].x * n[t].y), (o += (n[t].x + n[0].x) * e), (s += (n[t].y + n[0].y) * e), (a += e), Math.abs(a) < i)) {
                        for (o = 0, s = 0, t = 0; t < n.length; t += 1) (o += n[t].x), (s += n[t].y);
                        return new r(o / n.length, s / n.length);
                    }
                    return (a *= 0.5), (o *= 1 / (6 * a)), (s *= 1 / (6 * a)), new r(o, s);
                }),
                (a.bottom = function () {
                    var t, e;
                    if (0 === this._seg.length) return null;
                    for (t = this._seg[0], e = 1; e < this._seg.length; e += 1) this._seg[e].y > t.y && (t = this._seg[e]);
                    return t;
                }),
                (a.equal = a.equals = function (t) {
                    if (this._seg.length === t._seg.length) {
                        for (var e = 0; e < this._seg.length; e += 1) if (!this._seg[e].equals(t._seg[e])) return !1;
                        return !0;
                    }
                    return !1;
                }),
                (a.first = function () {
                    return this._seg.length > 0 ? this._seg[0] : null;
                }),
                (a.get = function (t) {
                    return this._seg[t];
                }),
                (a.getBounds = function () {
                    var t, e, n, i, o, a;
                    if (0 === this._seg.length) return null;
                    for (a = this._seg[0], t = a.x, e = a.y, n = a.x, i = a.y, o = 1; o < this._seg.length; o += 1) (a = this._seg[o]), (t = Math.min(t, a.x)), (e = Math.min(e, a.y)), (n = Math.max(n, a.x)), (i = Math.max(i, a.y));
                    return new s([new r(t, e), new r(t, i), new r(n, i), new r(n, e)]);
                }),
                (a.getHull = function () {
                    if (this._seg.length < 1) return this;
                    var t = o(
                            this._seg.map(function (t) {
                                return t.toArray();
                            })
                        ),
                        e = t.map(function (t) {
                            return this._seg[t];
                        }, this);
                    return new s(e);
                }),
                (a.last = function () {
                    return this._seg.length > 0 ? this._seg[this._seg.length - 1] : null;
                }),
                (a.left = function () {
                    var t, e;
                    if (0 === this._seg.length) return null;
                    for (t = this._seg[0], e = 1; e < this._seg.length; e += 1) this._seg[e].x < t.x && (t = this._seg[e]);
                    return t;
                }),
                (a.right = function () {
                    var t, e;
                    if (0 === this._seg.length) return null;
                    for (t = this._seg[0], e = 1; e < this._seg.length; e += 1) this._seg[e].x > t.x && (t = this._seg[e]);
                    return t;
                }),
                (a.toArray = function () {
                    return this._seg;
                }),
                (a.top = function () {
                    var t, e;
                    if (0 === this._seg.length) return null;
                    for (t = this._seg[0], e = 1; e < this._seg.length; e += 1) this._seg[e].y < t.y && (t = this._seg[e]);
                    return t;
                }),
                (a.transform = function (t) {
                    var e = this._seg.map(function (e) {
                        return e.transform(t);
                    });
                    return new s(e);
                }),
                (t.exports = s);
        },
        function (t, e, n) {
            var r = n(3),
                i = n(6),
                o = function (t, e) {
                    (this._p = void 0 === t ? new i() : void 0 === e ? t : t.transform(e.getGlobalTransform())), (this.length = this._p.length);
                },
                s = o.prototype;
            (s.add = function (t) {
                return new o(this._p.add(t._p));
            }),
                (s.almostEqual = function (t) {
                    return this._p.almostEqual(t._p);
                }),
                (s.atMid = function () {
                    return new r(this._p.atMid());
                }),
                (s.bottom = function () {
                    return console.warn("IPath#bottom is a deprecated method."), new r(this._p.bottom());
                }),
                (s.equal = s.equals = function (t) {
                    return this._p.equals(t._p);
                }),
                (s.first = function () {
                    return new r(this._p.first());
                }),
                (s.get = function (t) {
                    return new r(this._p.get(t));
                }),
                (s.getBounds = function () {
                    return console.warn("IPath#getBounds is a deprecated method."), new o(this._p.getBounds());
                }),
                (s.getHull = function () {
                    return new o(this._p.getHull());
                }),
                (s.last = function () {
                    return new r(this._p.last());
                }),
                (s.left = function () {
                    return console.warn("IPath#left is a deprecated method."), new r(this._p.left());
                }),
                (s.right = function () {
                    return console.warn("IPath#right is a deprecated method."), new r(this._p.right());
                }),
                (s.to = function (t) {
                    if (null === t || t.isRoot()) return this._p;
                    var e = t.getGlobalTransform().inverse();
                    return this._p.transform(e);
                }),
                (s.toArray = function () {
                    return this._p.toArray().map(function (t) {
                        return new r(t);
                    });
                }),
                (s.top = function () {
                    return console.warn("IPath#right is a deprecated method."), new r(this._p.top());
                }),
                (s.toSpace = function () {
                    return this._p;
                }),
                (s.transform = function (t) {
                    return new o(this._p.transform(t.toSpace()));
                }),
                (t.exports = o);
        },
        function (t, e, n) {
            var r = n(5),
                i = n(12),
                o = function (t, e) {
                    return e.multiplyBy(t.multiplyBy(e.inverse()));
                },
                s = function (t, e) {
                    if (e && !("_T" in e)) throw new Error("invalid reference");
                    if (t && !t.hasOwnProperty("tx")) throw new Error("invalid transform");
                    void 0 === t && (t = r.IDENTITY), (this._tr = e ? o(t, e.getGlobalTransform()) : t);
                },
                a = s.prototype;
            (a.almostEqual = a.almostEquals = function (t) {
                return this._tr.almostEqual(t._tr);
            }),
                (a.equal = a.equals = function (t) {
                    return this._tr.equals(t._tr);
                }),
                (a.inverse = function () {
                    return new s(this._tr.inverse());
                }),
                (a.to = function (t) {
                    if (null === t || t.isRoot()) return this._tr;
                    var e = t.getGlobalTransform().inverse();
                    return o(this._tr, e);
                }),
                (a.toSpace = function () {
                    return this._tr;
                }),
                (a.multiplyRight = a.multiplyBy = a.transformBy = function (t) {
                    return new s(t._tr.multiplyBy(this._tr));
                }),
                (a.relativeTo = function (t) {
                    return new s(this._tr.multiplyBy(t._tr.inverse()));
                }),
                (a.translate = function (t, e) {
                    return s.estimate("T", t, e).multiplyRight(this);
                }),
                (a.scale = function (t, e, n) {
                    var r, i, o, a, h, u;
                    return (r = void 0 === n), r ? ((i = t.toSpace().toArray()), (a = e), (h = this._tr.scaleBy(a, i)), new s(h)) : ((o = e), (u = s.estimate("S", o, n, t)), u.multiplyBy(this));
                }),
                (a.rotate = function (t, e, n) {
                    var r, i, o, a, h, u;
                    return (r = void 0 === n), r ? ((i = t.toSpace().toArray()), (a = e), (h = this._tr.rotateBy(a, i)), new s(h)) : ((o = e), (u = s.estimate("R", o, n, t)), u.multiplyBy(this));
                }),
                (a.translateScale = function (t, e) {
                    return s.estimate("TS", t, e).multiplyBy(this);
                }),
                (a.translateRotate = function (t, e) {
                    return s.estimate("TR", t, e).multiplyBy(this);
                }),
                (a.scaleRotate = function (t, e, n) {
                    return s.estimate("SR", e, n, t).multiplyBy(this);
                }),
                (a.translateScaleRotate = function (t, e) {
                    return s.estimate("TSR", t, e).multiplyBy(this);
                }),
                (s.IDENTITY = new s()),
                (s.estimate = function (t, e, n, r) {
                    var o, a, h, u;
                    void 0 !== r && (o = r.toSpace().toArray()), e.hasOwnProperty("_vec") ? (e = [e]) : e.hasOwnProperty("_p") && (e = e.toArray()), n.hasOwnProperty("_vec") ? (n = [n]) : n.hasOwnProperty("_p") && (n = n.toArray());
                    var l = function (t) {
                        return [t._vec.x, t._vec.y];
                    };
                    return (a = e.map(l)), (h = n.map(l)), (u = i.estimate(t, a, h, o)), new s(u);
                }),
                (t.exports = s);
        },
        function (t, e, n) {
            var r = n(6),
                i = n(2),
                o = n(7),
                s = n(14),
                a = n(0),
                h = function () {
                    s.call(this);
                },
                u = a({}, s.prototype);
            (h.prototype = u),
                (u.atMid = function () {
                    return this.getHull().atMid();
                }),
                (u.setParent = function () {
                    throw new Error("Space cannot have a parent.");
                }),
                (u.remove = function () {}),
                (u.getHull = function () {
                    var t = this.getChildren();
                    return t.length < 1
                        ? new o(new r([new i(0, 0)]), this)
                        : t
                              .reduce(function (t, e) {
                                  return t.add(e.getHull());
                              }, new o())
                              .getHull();
                }),
                (t.exports = h);
        },
        function (t, e, n) {
            var r = n(3),
                i = n(2),
                o = n(19),
                s = n(18),
                a = n(7),
                h = n(6),
                u = n(14),
                l = n(0),
                f = function () {
                    u.call(this), (this._size = new s(1, 1));
                },
                c = l({}, u.prototype);
            (f.prototype = c),
                (c.atNorm = function (t, e) {
                    if ("number" != typeof e) throw new Error("Invalid (x, y) coordinates. Numbers are required.");
                    return new r(new i(this._size.width * t, this._size.height * e), this);
                }),
                (c.atMid = function () {
                    var t = new i(this._size.width / 2, this._size.height / 2);
                    return new r(t, this);
                }),
                (c.atMidN = function () {
                    return new r(new i(this._size.width / 2, 0), this);
                }),
                (c.atMidW = function () {
                    return new r(new i(0, this._size.height / 2), this);
                }),
                (c.atMidE = function () {
                    return new r(new i(this._size.width, this._size.height / 2), this);
                }),
                (c.atMidS = function () {
                    return new r(new i(this._size.width / 2, this._size.height), this);
                }),
                (c.atNW = function () {
                    return new r(new i(0, 0), this);
                }),
                (c.atNE = function () {
                    return new r(new i(this._size.width, 0), this);
                }),
                (c.atSW = function () {
                    return new r(new i(0, this._size.height), this);
                }),
                (c.atSE = function () {
                    return new r(new i(this._size.width, this._size.height), this);
                }),
                (c.fitScale = function (t) {
                    var e,
                        n,
                        r,
                        o,
                        s,
                        u,
                        l,
                        f = this.getHull().to(this).getBounds(),
                        c = t.getHull().to(this).getBounds(),
                        d = f.get(2).x - f.get(0).x,
                        p = f.get(2).y - f.get(0).y,
                        m = c.get(2).x - c.get(0).x,
                        v = c.get(2).y - c.get(0).y,
                        g = d / p,
                        y = m / v;
                    return (
                        y > g
                            ? ((e = d / y), (n = p / 2 - e / 2), (s = new h([new i(f.get(0).x, f.get(0).y + n), new i(f.get(1).x, f.get(1).y - n), new i(f.get(2).x, f.get(2).y - n), new i(f.get(3).x, f.get(3).y + n)])))
                            : ((r = p * y), (o = d / 2 - r / 2), (s = new h([new i(f.get(0).x + o, f.get(0).y), new i(f.get(1).x + o, f.get(1).y), new i(f.get(2).x - o, f.get(2).y), new i(f.get(3).x - o, f.get(3).y)]))),
                        (u = new a(s, this)),
                        (l = new a(c, this)),
                        this.translateScale(u, l)
                    );
                }),
                (c.fitSize = function (t) {
                    var e = t.getHull().to(this).getBounds(),
                        n = e.get(0),
                        i = e.get(2),
                        o = i.x - n.x,
                        a = i.y - n.y,
                        h = this._size;
                    return (this._size = new s(o, a)), this.translate(this.atNW(), new r(n, this)), this.emit("resized", { source: this, newSize: this._size, oldSize: h }), this;
                }),
                (c.getHull = function () {
                    return new a(new h([new i(0, 0), new i(0, this._size.height), new i(this._size.width, this._size.height), new i(this._size.width, 0)]), this);
                }),
                (c.getSize = function () {
                    return this._size;
                }),
                (c.getISize = function () {
                    return new o(this._size, this);
                }),
                (c.setSize = function (t, e) {
                    var n = this._size;
                    if ("object" == typeof t) this._size = t;
                    else {
                        if ("number" != typeof t || "number" != typeof e) throw new Error("Invalid size parameters");
                        this._size = new s(t, e);
                    }
                    return this.emit("resized", { source: this, newSize: this._size, oldSize: n }), this;
                }),
                (c.setISize = function (t) {
                    var e = this._size;
                    return (this._size = t.to(this)), this.emit("resized", { source: this, newSize: this._size, oldSize: e }), this;
                }),
                (t.exports = f);
        },
        function (t, e) {
            (e.extend = function (t, e) {
                var n,
                    r = {};
                for (n in t) t.hasOwnProperty(n) && (r[n] = t[n]);
                for (n in e) e.hasOwnProperty(n) && (r[n] = e[n]);
                return r;
            }),
                (e.convertToTransformationType = function (t) {
                    var e = t.translate && !t.pivot,
                        n = t.scale,
                        r = t.rotate;
                    return e || n || r ? (e ? "T" : "") + (n ? "S" : "") + (r ? "R" : "") : "I";
                }),
                (e.clone = function (t) {
                    var e,
                        n = {};
                    for (e in t) t.hasOwnProperty(e) && (n[e] = t[e]);
                    return n;
                }),
                (e.cardinality = function (t) {
                    var e,
                        n = 0;
                    for (e in t) t.hasOwnProperty(e) && (n += 1);
                    return n;
                });
        },
        function (t, e, n) {
            (e.Transform = n(1)),
                (e.estimateI = n(26)),
                (e.estimateT = n(27)),
                (e.estimateS = n(28)),
                (e.estimateR = n(29)),
                (e.estimateTS = n(30)),
                (e.estimateTR = n(31)),
                (e.estimateSR = n(32)),
                (e.estimateTSR = n(33)),
                (e.version = n(34)),
                (e.create = function (t, n, r, i) {
                    "number" != typeof t && (t = 1), "number" != typeof n && (n = 0), "number" != typeof r && (r = 0), "number" != typeof i && (i = 0);
                    var o = t * Math.cos(n),
                        s = t * Math.sin(n);
                    return new e.Transform(o, s, r, i);
                }),
                (e.createFromArray = function (t) {
                    var n = t[0],
                        r = t[1],
                        i = t[2],
                        o = t[3];
                    return new e.Transform(n, r, i, o);
                }),
                (e.estimate = function (t, n, r, i) {
                    var o = "estimate" + t.toUpperCase();
                    if (e.hasOwnProperty(o)) return e[o](n, r, i);
                    throw new Error("Unknown estimator type: " + t);
                });
        },
        function (t, e) {
            var n = function (t, e) {
                    if ("number" != typeof t) throw new Error("a valid number is required");
                    this._num = void 0 === e ? t : t * e.getGlobalTransform().getScale();
                },
                r = n.prototype;
            (r.add = function (t) {
                return new n(this._num + t._num);
            }),
                (r.equal = r.equals = function (t) {
                    return this._num === t._num;
                }),
                (r.to = function (t) {
                    if (null === t || t.isRoot()) return this._num;
                    var e = t.getGlobalTransform().inverse().getScale();
                    return this._num * e;
                }),
                (r.toSpace = function () {
                    return this._num;
                }),
                (t.exports = n);
        },
        function (t, e, n) {
            var r = n(8),
                i = n(3),
                o = n(2),
                s = n(5),
                a = n(42),
                h = n(0),
                u = function () {
                    a.call(this),
                        (this._T = s.IDENTITY),
                        this.on("removed", function (t) {
                            if (null === t.newParent) t.source._T = s.IDENTITY;
                            else if (null === t.oldParent) throw new Error("Could not be removed from null parent");
                        });
                },
                l = h({}, a.prototype);
            (u.prototype = l),
                (l.at = function (t, e) {
                    if ("object" == typeof t && void 0 === e) return new i(t, this);
                    if ("number" != typeof t && "number" != typeof e) throw new Error("Invalid Vector");
                    return new i(new o(t, e), this);
                }),
                (l.getGlobalTransform = function () {
                    var t, e;
                    for (t = s.IDENTITY, e = this; null !== e._parent; ) (t = e._T.multiplyRight(t)), (e = e._parent);
                    return t;
                }),
                (l.getGlobalITransform = function () {
                    var t, e;
                    for (t = s.IDENTITY, e = this; null !== e._parent; ) (t = e._T.multiplyRight(t)), (e = e._parent);
                    return new r(t);
                }),
                (l.getLocalTransform = function () {
                    return this._T;
                }),
                (l.getLocalITransform = function () {
                    return null === this._parent ? r.IDENTITY : new r(this._T, this._parent);
                }),
                (l.resetTransform = function () {
                    return this.setLocalTransform(s.IDENTITY);
                }),
                (l.setGlobalTransform = function (t) {
                    if (null !== this._parent) {
                        var e = this._parent.getGlobalTransform(),
                            n = e.inverse().multiplyBy(t);
                        return this.setLocalTransform(n);
                    }
                }),
                (l.setGlobalITransform = function (t) {
                    return this.setGlobalTransform(t.toSpace());
                }),
                (l.setLocalTransform = function (t) {
                    if (null !== this._parent) {
                        var e = this._T;
                        return (this._T = t), this.emit("transformed", { source: this, newTransform: this._T, oldTransform: e }), this;
                    }
                }),
                (l.setLocalITransform = function (t) {
                    if (null !== this._parent) {
                        var e = t.to(this._parent);
                        return this.setLocalTransform(e);
                    }
                }),
                (l.snap = function (t, e) {
                    if (null !== this._parent) {
                        var n = e.to(this._parent).snap(t.to(this), this._T);
                        return this.setLocalTransform(n);
                    }
                }),
                (l.transformBy = function (t, e) {
                    if (null !== this._parent) return void 0 === e && (e = this._parent), t.hasOwnProperty("_tr") && (t = t.to(e)), this.setLocalTransform(t.multiplyRight(this._T));
                }),
                (l.translate = function (t, e) {
                    var n = r.estimate("T", t, e);
                    return this.transformBy(n);
                }),
                (l.scale = function (t, e, n) {
                    var i = r.IDENTITY.scale(t, e, n);
                    return this.transformBy(i);
                }),
                (l.rotate = function (t, e, n) {
                    var i = r.IDENTITY.rotate(t, e, n);
                    return this.transformBy(i);
                }),
                (l.translateScale = function (t, e) {
                    var n = r.estimate("TS", t, e);
                    return this.transformBy(n);
                }),
                (l.translateRotate = function (t, e) {
                    var n = r.estimate("TR", t, e);
                    return this.transformBy(n);
                }),
                (l.scaleRotate = function (t, e, n) {
                    var i = r.estimate("SR", e, n, t);
                    return this.transformBy(i);
                }),
                (l.translateScaleRotate = function (t, e) {
                    var n = r.estimate("TSR", t, e);
                    return this.transformBy(n);
                }),
                (t.exports = u);
        },
        function (t, e, n) {
            function r(t) {
                if (t) return i(t);
            }
            function i(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t;
            }
            (t.exports = r),
                (r.prototype.on = r.prototype.addEventListener = function (t, e) {
                    return (this._callbacks = this._callbacks || {}), (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
                }),
                (r.prototype.once = function (t, e) {
                    function n() {
                        this.off(t, n), e.apply(this, arguments);
                    }
                    return (n.fn = e), this.on(t, n), this;
                }),
                (r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
                    if (((this._callbacks = this._callbacks || {}), 0 == arguments.length)) return (this._callbacks = {}), this;
                    var n = this._callbacks["$" + t];
                    if (!n) return this;
                    if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                    for (var r, i = 0; i < n.length; i++)
                        if ((r = n[i]) === e || r.fn === e) {
                            n.splice(i, 1);
                            break;
                        }
                    return this;
                }),
                (r.prototype.emit = function (t) {
                    this._callbacks = this._callbacks || {};
                    var e = [].slice.call(arguments, 1),
                        n = this._callbacks["$" + t];
                    if (n) {
                        n = n.slice(0);
                        for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, e);
                    }
                    return this;
                }),
                (r.prototype.listeners = function (t) {
                    return (this._callbacks = this._callbacks || {}), this._callbacks["$" + t] || [];
                }),
                (r.prototype.hasListeners = function (t) {
                    return !!this.listeners(t).length;
                });
        },
        function (t, e, n) {
            var r = n(4),
                i = n(2),
                o = n(6),
                s = n(0),
                a = { xStep: 0, yStep: 0, scaleStep: 0, rotateStep: 0, xPhase: 0, yPhase: 0, scalePhase: 0, rotatePhase: 0, xRotation: 0, yRotation: Math.PI / 2 },
                h = function (t, e, n) {
                    return Math.round((t - n) / e) * e + n;
                },
                u = function (t) {
                    if (((t = "object" != typeof t ? a : s({}, a, t)), (t.xStep < r && t.yStep > r) || (t.xStep > r && t.yStep < r))) throw new Error("Grid xStep and yStep must be either both zero or both greater than zero.");
                    if (Math.abs(t.xRotation - t.yRotation) < r) throw new Error("Grid xRotation and yRotation cannot be the same.");
                    this.mode = t;
                },
                l = u.prototype;
            (l.almostEqual = function (t) {
                var e,
                    n = this.mode,
                    i = t.mode;
                for (e in n)
                    if (n.hasOwnProperty(e)) {
                        if (!i.hasOwnProperty(e)) return !1;
                        if (Math.abs(n[e] - i[e]) > r) return !1;
                    }
                return !0;
            }),
                (l.at = function (t, e) {
                    var n = this.mode;
                    if (0 === n.xStep || 0 === n.yStep) return new i(0, 0);
                    var r = i.createFromPolar(n.xStep, n.xRotation),
                        o = i.createFromPolar(n.yStep, n.yRotation),
                        s = r.multiply(n.xPhase / n.xStep),
                        a = o.multiply(n.yPhase / n.yStep);
                    return s.add(a).add(r.multiply(t)).add(o.multiply(e));
                }),
                (l.equal = l.equals = function (t) {
                    var e,
                        n = this.mode,
                        r = t.mode;
                    for (e in n)
                        if (n.hasOwnProperty(e)) {
                            if (!r.hasOwnProperty(e)) return !1;
                            if (n[e] !== r[e]) return !1;
                        }
                    return !0;
                }),
                (l.getHullOf = function (t, e) {
                    var n = this.mode,
                        r = i.createFromPolar(n.xStep, n.xRotation),
                        s = i.createFromPolar(n.yStep, n.yRotation),
                        a = this.getOrigin(),
                        h = a.add(r.multiply(t)).add(s.multiply(e)),
                        u = a.add(r.multiply(t)).add(s.multiply(e + 1)),
                        l = a.add(r.multiply(t + 1)).add(s.multiply(e + 1)),
                        f = a.add(r.multiply(t + 1)).add(s.multiply(e));
                    return new o([h, u, l, f]).getHull();
                }),
                (l.getOrigin = function () {
                    var t = this.mode,
                        e = i.createFromPolar(t.xStep, t.xRotation),
                        n = i.createFromPolar(t.yStep, t.yRotation),
                        r = e.multiply(t.xPhase / t.xStep),
                        o = n.multiply(t.yPhase / t.yStep);
                    return r.add(o);
                }),
                (l.snap = function (t, e) {
                    var n,
                        r,
                        o,
                        s,
                        a,
                        u,
                        l,
                        f,
                        c,
                        d,
                        p,
                        m,
                        v,
                        g,
                        y,
                        w = this.mode;
                    return (
                        (l = t.transform(e)),
                        0 === w.xStep || 0 === w.yStep
                            ? (d = l)
                            : ((o = i.createFromPolar(w.xStep, w.xRotation)),
                              (s = i.createFromPolar(w.yStep, w.yRotation)),
                              (f = l.changeBasis(o, s)),
                              (c = new i(h(f.x, 1, w.xPhase / w.xStep), h(f.y, 1, w.yPhase / w.yStep))),
                              (d = c.changeFromBasis(o, s))),
                        (n = d.x - l.x),
                        (r = d.y - l.y),
                        (a = e.translateBy(n, r)),
                        (p = a.getScale()),
                        (m = 0 === w.scaleStep ? p : h(p, w.scaleStep, w.scalePhase)),
                        (v = m / p),
                        (u = a.scaleBy(v, d.toArray())),
                        (g = u.getRotation()),
                        (y = 0 === w.rotateStep ? g : h(g, w.rotateStep, w.rotatePhase)),
                        u.rotateBy(y - g, d.toArray())
                    );
                }),
                (l.toArray = function () {
                    return [this.mode];
                }),
                (l.transform = function (t) {
                    var e = this.mode,
                        n = {},
                        r = t.getScale(),
                        o = t.getRotation();
                    if (((n.rotateStep = e.rotateStep), (n.rotatePhase = e.rotatePhase + o), (n.scaleStep = e.scaleStep * r), (n.scalePhase = e.scalePhase * r), 0 === e.xStep || 0 === e.yStep))
                        (n.xStep = e.xStep), (n.yStep = e.yStep), (n.xRotation = e.xRotation), (n.yRotation = e.yRotation), (n.xPhase = e.xPhase), (n.yPhase = e.yPhase);
                    else {
                        var s = i.createFromPolar(e.xStep, e.xRotation),
                            a = i.createFromPolar(e.yStep, e.yRotation),
                            h = t.translateBy(-t.tx, -t.ty),
                            l = s.transform(h),
                            f = a.transform(h);
                        (n.xStep = l.getMagnitude()), (n.yStep = f.getMagnitude()), (n.xRotation = l.getRotation()), (n.yRotation = f.getRotation());
                        var c = e.xPhase / e.xStep,
                            d = e.yPhase / e.yStep,
                            p = new i(c, d),
                            m = p.changeFromBasis(s, a),
                            v = m.transform(t),
                            g = v.changeBasis(l, f),
                            y = g.x * l.getMagnitude(),
                            w = g.y * f.getMagnitude();
                        (n.xPhase = y), (n.yPhase = w);
                    }
                    return new u(n);
                }),
                (t.exports = u);
        },
        function (t, e, n) {
            "use strict";
            function r(t, e, n) {
                var r = t * e,
                    o = i * t,
                    s = o - t,
                    a = o - s,
                    h = t - a,
                    u = i * e,
                    l = u - e,
                    f = u - l,
                    c = e - f,
                    d = r - a * f,
                    p = d - h * f,
                    m = p - a * c,
                    v = h * c - m;
                return n ? ((n[0] = v), (n[1] = r), n) : [v, r];
            }
            t.exports = r;
            var i = +(Math.pow(2, 27) + 1);
        },
        function (t, e, n) {
            var r = n(4),
                i = function (t, e) {
                    if ("number" != typeof t || "number" != typeof e) throw new Error("Missing or invalid (width, height) parameters");
                    if (t < 0 || e < 0) throw new Error("Width and height must be zero or positive.");
                    (this.width = t), (this.height = e);
                },
                o = i.prototype;
            (o.almostEqual = function (t) {
                return Math.abs(this.width - t.width) + Math.abs(this.height - t.height) < r;
            }),
                (o.equal = function (t) {
                    return this.width === t.width && this.height === t.height;
                }),
                (o.getHeight = function () {
                    return this.height;
                }),
                (o.getWidth = function () {
                    return this.width;
                }),
                (o.transform = function (t) {
                    var e = t.getScale(),
                        n = this.width * e,
                        r = this.height * e;
                    return new i(n, r);
                }),
                (t.exports = i);
        },
        function (t, e, n) {
            var r = n(13),
                i = function (t, e) {
                    if (void 0 === t) throw new Error("Missing Size parameter");
                    this._size = void 0 === e ? t : t.transform(e.getGlobalTransform());
                },
                o = i.prototype;
            (o.almostEqual = function (t) {
                return this._size.equal(t._size);
            }),
                (o.equal = function (t) {
                    return this._size.equal(t._size);
                }),
                (o.getHeight = function () {
                    return new r(this._size.height);
                }),
                (o.getWidth = function () {
                    return new r(this._size.width);
                }),
                (o.to = function (t) {
                    if (null === t || t.isRoot()) return this._size;
                    var e = t.getGlobalTransform().inverse();
                    return this._size.transform(e);
                }),
                (o.toSpace = function () {
                    return this._size;
                }),
                (t.exports = i);
        },
        function (t, e, n) {
            var r = n(9),
                i = n(14),
                o = n(0),
                s = function (t) {
                    i.call(this), "object" == typeof t && this.setParent(t);
                },
                a = o({}, i.prototype);
            (s.prototype = a),
                (a.atMid = r.prototype.atMid),
                (a.getHull = r.prototype.getHull),
                (a.copy = function () {
                    var t = new s();
                    return (
                        this.getChildren().forEach(function (e) {
                            var n = e.copy(),
                                r = e.getLocalTransform();
                            n.setParent(t), n.setLocalTransform(r);
                        }),
                        t
                    );
                }),
                (t.exports = s);
        },
        function (t, e, n) {
            var r = n(10),
                i = n(0),
                o = function (t, e) {
                    r.call(this), (this.html = t), this.setSize(256, 256), "object" == typeof e && this.setParent(e);
                },
                s = i({}, r.prototype);
            (o.prototype = s),
                (s.copy = function () {
                    var t = new o(this.html);
                    return t.setSize(this.getSize()), t;
                }),
                (s.getHTML = function () {
                    return this.html;
                }),
                (t.exports = o);
        },
        function (t, e, n) {
            var r = n(10),
                i = n(0),
                o = function (t, e) {
                    if ("object" != typeof t) throw new Error("Invalid image");
                    r.call(this), (this.image = t), this.setSize(t.width, t.height), "object" == typeof e && this.setParent(e);
                };
            (o.prototype = i({}, r.prototype)),
                (o.prototype.copy = function () {
                    var t = new o(this.image);
                    return t.setSize(this.getSize()), t;
                }),
                (o.prototype.getImage = function () {
                    return this.image;
                }),
                (t.exports = o);
        },
        function (t, e, n) {
            var r = n(10),
                i = n(0),
                o = function (t, e) {
                    r.call(this), (this.color = "string" == typeof t ? t : "#000000"), this.setSize(1, 1), "object" == typeof e && this.setParent(e);
                };
            (o.prototype = i({}, r.prototype)),
                (o.prototype.copy = function () {
                    var t = new o(this.color);
                    return t.setSize(this.getSize()), t;
                }),
                (o.prototype.getColor = function () {
                    return this.color;
                }),
                (t.exports = o);
        },
        function (t, e, n) {
            (e.geom = n(25)),
                (e.Space = n(9)),
                (e.SpaceGroup = n(20)),
                (e.SpaceHTML = n(21)),
                (e.SpaceImage = n(22)),
                (e.SpacePixel = n(23)),
                (e.SpaceView = n(44)),
                (e.Touchable = n(47)),
                (e.Wheelable = n(51)),
                (e.preload = n(53)),
                (e.version = n(54));
        },
        function (t, e, n) {
            (e.EPSILON = n(4)),
                (e.Grid = n(16)),
                (e.IGrid = n(41)),
                (e.Path = n(6)),
                (e.IPath = n(7)),
                (e.IScalar = n(13)),
                (e.Size = n(18)),
                (e.ISize = n(19)),
                (e.Transform = n(5)),
                (e.ITransform = n(8)),
                (e.Vector = n(2)),
                (e.IVector = n(3));
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function () {
                return r.IDENTITY;
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e) {
                var n, i, o, s, a, h, u, l;
                if (((i = Math.min(t.length, e.length)), (o = s = a = h = 0), i < 1)) return r.IDENTITY;
                for (n = 0; n < i; n += 1) (o += t[n][0]), (s += t[n][1]), (a += e[n][0]), (h += e[n][1]);
                return (u = (a - o) / i), (l = (h - s) / i), new r(1, 0, u, l);
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e, n) {
                var i, o, s, a, h, u, l, f, c, d, p, m, v, g, y, w;
                for (o = Math.min(t.length, e.length), d = p = m = v = 0, void 0 === n ? (a = h = 0) : ((a = n[0]), (h = n[1])), i = 0; i < o; i += 1)
                    (u = t[i][0] - a), (l = t[i][1] - h), (f = e[i][0] - a), (c = e[i][1] - h), (d += u * f), (p += l * c), (m += u * u), (v += l * l);
                return 0 === (s = m + v) ? r.IDENTITY : ((g = Math.max(0, (d + p) / s)), (y = (1 - g) * a), (w = (1 - g) * h), new r(g, 0, y, w));
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e, n) {
                var i, o, s, a, h, u, l, f, c, d, p, m, v, g, y, w, _, x, b;
                for (o = Math.min(t.length, e.length), d = p = m = v = 0, void 0 === n ? (a = h = 0) : ((a = n[0]), (h = n[1])), i = 0; i < o; i += 1)
                    (u = t[i][0] - a), (l = t[i][1] - h), (f = e[i][0] - a), (c = e[i][1] - h), (d += u * f), (p += u * c), (m += l * f), (v += l * c);
                return (g = d + v), (y = p - m), 0 === (s = Math.sqrt(g * g + y * y)) ? r.IDENTITY : ((w = g / s), (_ = y / s), (x = a - a * w + h * _), (b = h - a * _ - h * w), new r(w, _, x, b));
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e) {
                var n,
                    i,
                    o,
                    s,
                    a,
                    h,
                    u,
                    l,
                    f,
                    c,
                    d,
                    p,
                    m,
                    v = t,
                    g = e,
                    y = Math.min(v.length, g.length);
                for (h = u = l = f = c = d = p = m = 0, n = 0; n < y; n += 1) (i = v[n][0]), (o = v[n][1]), (s = g[n][0]), (a = g[n][1]), (h += i), (u += o), (l += s), (f += a), (c += i * i), (d += o * o), (p += i * s), (m += o * a);
                var w = y * y,
                    _ = h * h,
                    x = u * u,
                    b = c + d,
                    E = p + m,
                    S = w * b - y * (_ + x);
                return S < 1e-8
                    ? 0 === y
                        ? new r(1, 0, 0, 0)
                        : new r(1, 0, l / y - i, f / y - o)
                    : new r((w * E - y * (h * l + u * f)) / S, 0, (-y * h * E + y * l * b - x * l + h * u * f) / S, (-y * u * E + y * f * b - _ * f + h * u * l) / S);
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e) {
                var n,
                    i,
                    o,
                    s,
                    a,
                    h,
                    u,
                    l,
                    f,
                    c,
                    d,
                    p,
                    m,
                    v = t,
                    g = e,
                    y = Math.min(v.length, g.length);
                for (h = u = l = f = c = d = p = m = 0, n = 0; n < y; n += 1) (i = v[n][0]), (o = v[n][1]), (s = g[n][0]), (a = g[n][1]), (h += i), (u += o), (l += s), (f += a), (c += i * s), (d += i * a), (p += o * s), (m += o * a);
                var w = y * (d - p) - h * f + u * l,
                    _ = y * (c + m) - h * l - u * f,
                    x = Math.sqrt(w * w + _ * _);
                if (x < 1e-8) return 0 === y ? new r(1, 0, 0, 0) : new r(1, 0, (l - h) / y, (f - u) / y);
                var b = _ / x,
                    E = w / x;
                return new r(b, E, (-h * b + u * E + l) / y, (-h * E - u * b + f) / y);
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e, n) {
                var i, o, s, a, h, u, l;
                void 0 === n && (n = [0, 0]), (i = t), (o = e), (s = Math.min(i.length, o.length));
                var f,
                    c,
                    d,
                    p,
                    m,
                    v,
                    g,
                    y = n[0],
                    w = n[1];
                v = g = 0;
                var _, x, b, E;
                for (_ = x = b = E = 0, f = 0; f < s; f += 1) (c = i[f][0] - y), (d = i[f][1] - w), (p = o[f][0] - y), (m = o[f][1] - w), (v += c * c), (g += d * d), (_ += c * p), (x += d * m), (b += d * p), (E += c * m);
                var S = v + g;
                return Math.abs(S) < 1e-8 ? new r(1, 0, 0, 0) : ((a = (_ + x) / S), (h = (-b + E) / S), (u = w * h - y * a + y), (l = -y * h - w * a + w), new r(a, h, u, l));
            };
        },
        function (t, e, n) {
            var r = n(1);
            t.exports = function (t, e) {
                var n, i, o, s, a, h, u;
                if (((n = t), (i = e), 0 === (o = Math.min(n.length, i.length)))) return new r(1, 0, 0, 0);
                var l,
                    f,
                    c,
                    d,
                    p,
                    m = 0,
                    v = 0,
                    g = 0,
                    y = 0,
                    w = 0,
                    _ = 0,
                    x = 0,
                    b = 0,
                    E = 0,
                    S = 0;
                for (l = 0; l < o; l += 1) (f = n[l][0]), (c = n[l][1]), (d = i[l][0]), (p = i[l][1]), (m += f), (v += c), (g += d), (y += p), (w += f * f), (_ += c * c), (x += f * p), (b += c * d), (E += f * d), (S += c * p);
                var P = o * w + o * _ - m * m - v * v;
                return -1e-8 < P && P < 1e-8
                    ? new r(1, 0, g / o - f, y / o - c)
                    : ((s = (o * (E + S) - m * g - v * y) / P), (a = (o * (x - b) + v * g - m * y) / P), (h = (-m * (E + S) + v * (x - b) + w * g + _ * g) / P), (u = (-v * (E + S) - m * (x - b) + w * y + _ * y) / P), new r(s, a, h, u));
            };
        },
        function (t, e) {
            t.exports = "1.4.0";
        },
        function (t, e, n) {
            "use strict";
            function r(t) {
                var e = t.length;
                if (e < 3) {
                    for (var n = new Array(e), r = 0; r < e; ++r) n[r] = r;
                    return 2 === e && t[0][0] === t[1][0] && t[0][1] === t[1][1] ? [0] : n;
                }
                for (var o = new Array(e), r = 0; r < e; ++r) o[r] = r;
                o.sort(function (e, n) {
                    var r = t[e][0] - t[n][0];
                    return r || t[e][1] - t[n][1];
                });
                for (var s = [o[0], o[1]], a = [o[0], o[1]], r = 2; r < e; ++r) {
                    for (var h = o[r], u = t[h], l = s.length; l > 1 && i(t[s[l - 2]], t[s[l - 1]], u) <= 0; ) (l -= 1), s.pop();
                    for (s.push(h), l = a.length; l > 1 && i(t[a[l - 2]], t[a[l - 1]], u) >= 0; ) (l -= 1), a.pop();
                    a.push(h);
                }
                for (var n = new Array(a.length + s.length - 2), f = 0, r = 0, c = s.length; r < c; ++r) n[f++] = s[r];
                for (var d = a.length - 2; d > 0; --d) n[f++] = a[d];
                return n;
            }
            t.exports = r;
            var i = n(36)[3];
        },
        function (t, e, n) {
            "use strict";
            function r(t, e) {
                for (var n = new Array(t.length - 1), r = 1; r < t.length; ++r) for (var i = (n[r - 1] = new Array(t.length - 1)), o = 0, s = 0; o < t.length; ++o) o !== e && (i[s++] = t[r][o]);
                return n;
            }
            function i(t) {
                for (var e = new Array(t), n = 0; n < t; ++n) {
                    e[n] = new Array(t);
                    for (var r = 0; r < t; ++r) e[n][r] = ["m", r, "[", t - n - 1, "]"].join("");
                }
                return e;
            }
            function o(t) {
                return 1 & t ? "-" : "";
            }
            function s(t) {
                if (1 === t.length) return t[0];
                if (2 === t.length) return ["sum(", t[0], ",", t[1], ")"].join("");
                var e = t.length >> 1;
                return ["sum(", s(t.slice(0, e)), ",", s(t.slice(e)), ")"].join("");
            }
            function a(t) {
                if (2 === t.length) return [["sum(prod(", t[0][0], ",", t[1][1], "),prod(-", t[0][1], ",", t[1][0], "))"].join("")];
                for (var e = [], n = 0; n < t.length; ++n) e.push(["scale(", s(a(r(t, n))), ",", o(n), t[0][n], ")"].join(""));
                return e;
            }
            function h(t) {
                for (var e = [], n = [], o = i(t), h = [], u = 0; u < t; ++u) 0 == (1 & u) ? e.push.apply(e, a(r(o, u))) : n.push.apply(n, a(r(o, u))), h.push("m" + u);
                var p = s(e),
                    m = s(n),
                    v = "orientation" + t + "Exact",
                    g = ["function ", v, "(", h.join(), "){var p=", p, ",n=", m, ",d=sub(p,n);return d[d.length-1];};return ", v].join("");
                return new Function("sum", "prod", "scale", "sub", g)(f, l, c, d);
            }
            function u(t) {
                var e = g[t.length];
                return e || (e = g[t.length] = h(t.length)), e.apply(void 0, t);
            }
            var l = n(17),
                f = n(37),
                c = n(38),
                d = n(40),
                p = 5,
                m = h(3),
                v = h(4),
                g = [
                    function () {
                        return 0;
                    },
                    function () {
                        return 0;
                    },
                    function (t, e) {
                        return e[0] - t[0];
                    },
                    function (t, e, n) {
                        var r,
                            i = (t[1] - n[1]) * (e[0] - n[0]),
                            o = (t[0] - n[0]) * (e[1] - n[1]),
                            s = i - o;
                        if (i > 0) {
                            if (o <= 0) return s;
                            r = i + o;
                        } else {
                            if (!(i < 0)) return s;
                            if (o >= 0) return s;
                            r = -(i + o);
                        }
                        var a = 3.3306690738754716e-16 * r;
                        return s >= a || s <= -a ? s : m(t, e, n);
                    },
                    function (t, e, n, r) {
                        var i = t[0] - r[0],
                            o = e[0] - r[0],
                            s = n[0] - r[0],
                            a = t[1] - r[1],
                            h = e[1] - r[1],
                            u = n[1] - r[1],
                            l = t[2] - r[2],
                            f = e[2] - r[2],
                            c = n[2] - r[2],
                            d = o * u,
                            p = s * h,
                            m = s * a,
                            g = i * u,
                            y = i * h,
                            w = o * a,
                            _ = l * (d - p) + f * (m - g) + c * (y - w),
                            x = (Math.abs(d) + Math.abs(p)) * Math.abs(l) + (Math.abs(m) + Math.abs(g)) * Math.abs(f) + (Math.abs(y) + Math.abs(w)) * Math.abs(c),
                            b = 7.771561172376103e-16 * x;
                        return _ > b || -_ > b ? _ : v(t, e, n, r);
                    },
                ];
            !(function () {
                for (; g.length <= p; ) g.push(h(g.length));
                for (var e = [], n = ["slow"], r = 0; r <= p; ++r) e.push("a" + r), n.push("o" + r);
                for (var i = ["function getOrientation(", e.join(), "){switch(arguments.length){case 0:case 1:return 0;"], r = 2; r <= p; ++r) i.push("case ", r, ":return o", r, "(", e.slice(0, r).join(), ");");
                i.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation"), n.push(i.join(""));
                var o = Function.apply(void 0, n);
                t.exports = o.apply(void 0, [u].concat(g));
                for (var r = 0; r <= p; ++r) t.exports[r] = g[r];
            })();
        },
        function (t, e, n) {
            "use strict";
            function r(t, e) {
                var n = t + e,
                    r = n - t,
                    i = n - r,
                    o = e - r,
                    s = t - i,
                    a = s + o;
                return a ? [a, n] : [n];
            }
            function i(t, e) {
                var n = 0 | t.length,
                    i = 0 | e.length;
                if (1 === n && 1 === i) return r(t[0], e[0]);
                var o,
                    s,
                    a = n + i,
                    h = new Array(a),
                    u = 0,
                    l = 0,
                    f = 0,
                    c = Math.abs,
                    d = t[l],
                    p = c(d),
                    m = e[f],
                    v = c(m);
                p < v ? ((s = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((s = m), (f += 1) < i && ((m = e[f]), (v = c(m)))),
                    (l < n && p < v) || f >= i ? ((o = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((o = m), (f += 1) < i && ((m = e[f]), (v = c(m))));
                for (var g, y, w, _, x, b = o + s, E = b - o, S = s - E, P = S, T = b; l < n && f < i; )
                    p < v ? ((o = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((o = m), (f += 1) < i && ((m = e[f]), (v = c(m)))),
                        (s = P),
                        (b = o + s),
                        (E = b - o),
                        (S = s - E),
                        S && (h[u++] = S),
                        (g = T + b),
                        (y = g - T),
                        (w = g - y),
                        (_ = b - y),
                        (x = T - w),
                        (P = x + _),
                        (T = g);
                for (; l < n; ) (o = d), (s = P), (b = o + s), (E = b - o), (S = s - E), S && (h[u++] = S), (g = T + b), (y = g - T), (w = g - y), (_ = b - y), (x = T - w), (P = x + _), (T = g), (l += 1) < n && (d = t[l]);
                for (; f < i; ) (o = m), (s = P), (b = o + s), (E = b - o), (S = s - E), S && (h[u++] = S), (g = T + b), (y = g - T), (w = g - y), (_ = b - y), (x = T - w), (P = x + _), (T = g), (f += 1) < i && (m = e[f]);
                return P && (h[u++] = P), T && (h[u++] = T), u || (h[u++] = 0), (h.length = u), h;
            }
            t.exports = i;
        },
        function (t, e, n) {
            "use strict";
            function r(t, e) {
                var n = t.length;
                if (1 === n) {
                    var r = i(t[0], e);
                    return r[0] ? r : [r[1]];
                }
                var s = new Array(2 * n),
                    a = [0.1, 0.1],
                    h = [0.1, 0.1],
                    u = 0;
                i(t[0], e, a), a[0] && (s[u++] = a[0]);
                for (var l = 1; l < n; ++l) {
                    i(t[l], e, h);
                    var f = a[1];
                    o(f, h[0], a), a[0] && (s[u++] = a[0]);
                    var c = h[1],
                        d = a[1],
                        p = c + d,
                        m = p - c,
                        v = d - m;
                    (a[1] = p), v && (s[u++] = v);
                }
                return a[1] && (s[u++] = a[1]), 0 === u && (s[u++] = 0), (s.length = u), s;
            }
            var i = n(17),
                o = n(39);
            t.exports = r;
        },
        function (t, e, n) {
            "use strict";
            function r(t, e, n) {
                var r = t + e,
                    i = r - t,
                    o = r - i,
                    s = e - i,
                    a = t - o;
                return n ? ((n[0] = a + s), (n[1] = r), n) : [a + s, r];
            }
            t.exports = r;
        },
        function (t, e, n) {
            "use strict";
            function r(t, e) {
                var n = t + e,
                    r = n - t,
                    i = n - r,
                    o = e - r,
                    s = t - i,
                    a = s + o;
                return a ? [a, n] : [n];
            }
            function i(t, e) {
                var n = 0 | t.length,
                    i = 0 | e.length;
                if (1 === n && 1 === i) return r(t[0], -e[0]);
                var o,
                    s,
                    a = n + i,
                    h = new Array(a),
                    u = 0,
                    l = 0,
                    f = 0,
                    c = Math.abs,
                    d = t[l],
                    p = c(d),
                    m = -e[f],
                    v = c(m);
                p < v ? ((s = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((s = m), (f += 1) < i && ((m = -e[f]), (v = c(m)))),
                    (l < n && p < v) || f >= i ? ((o = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((o = m), (f += 1) < i && ((m = -e[f]), (v = c(m))));
                for (var g, y, w, _, x, b = o + s, E = b - o, S = s - E, P = S, T = b; l < n && f < i; )
                    p < v ? ((o = d), (l += 1) < n && ((d = t[l]), (p = c(d)))) : ((o = m), (f += 1) < i && ((m = -e[f]), (v = c(m)))),
                        (s = P),
                        (b = o + s),
                        (E = b - o),
                        (S = s - E),
                        S && (h[u++] = S),
                        (g = T + b),
                        (y = g - T),
                        (w = g - y),
                        (_ = b - y),
                        (x = T - w),
                        (P = x + _),
                        (T = g);
                for (; l < n; ) (o = d), (s = P), (b = o + s), (E = b - o), (S = s - E), S && (h[u++] = S), (g = T + b), (y = g - T), (w = g - y), (_ = b - y), (x = T - w), (P = x + _), (T = g), (l += 1) < n && (d = t[l]);
                for (; f < i; ) (o = m), (s = P), (b = o + s), (E = b - o), (S = s - E), S && (h[u++] = S), (g = T + b), (y = g - T), (w = g - y), (_ = b - y), (x = T - w), (P = x + _), (T = g), (f += 1) < i && (m = -e[f]);
                return P && (h[u++] = P), T && (h[u++] = T), u || (h[u++] = 0), (h.length = u), h;
            }
            t.exports = i;
        },
        function (t, e, n) {
            var r = n(3),
                i = n(7),
                o = n(8),
                s = n(16),
                a = function (t, e) {
                    void 0 === t ? (this._grid = new s()) : (t.hasOwnProperty("mode") || (t = new s(t)), (this._grid = void 0 === e ? t : t.transform(e.getGlobalTransform())));
                },
                h = a.prototype;
            (h.almostEqual = function (t) {
                return this._grid.almostEqual(t._grid);
            }),
                (h.at = function (t, e) {
                    return new r(this._grid.at(t, e));
                }),
                (h.equal = h.equals = function (t) {
                    return this._grid.equals(t._grid);
                }),
                (h.getHullOf = function (t, e) {
                    var n = this._grid.getHullOf(t, e);
                    return new i(n);
                }),
                (h.getOrigin = function () {
                    var t = this._grid.getOrigin();
                    return new r(t);
                }),
                (h.snap = function (t, e) {
                    var n = t.toSpace().transform(e._tr.inverse());
                    return new o(this._grid.snap(n, e._tr));
                }),
                (h.to = function (t) {
                    if (null === t || t.isRoot()) return this._grid;
                    var e = t.getGlobalTransform().inverse();
                    return this._grid.transform(e);
                }),
                (h.toSpace = function () {
                    return this._grid;
                }),
                (h.transform = function (t) {
                    return new a(this._grid.transform(t._tr));
                }),
                (t.exports = a);
        },
        function (t, e, n) {
            var r = n(15),
                i = n(0),
                o = n(43)(0),
                s = function () {
                    r.call(this), (this.id = o.next().toString()), (this._parent = null), (this._prevSibling = null), (this._nextSibling = null), (this._children = {}), (this._order = []);
                },
                a = i({}, r.prototype);
            (s.prototype = a),
                (a.addChild = function (t, e) {
                    return t.setParent(this, e), this;
                }),
                (a.bringAbove = function (t) {
                    if (t.isRoot()) throw new Error("Cannot send after a root node.");
                    var e = t._parent,
                        n = e._order.indexOf(t),
                        r = this._parent;
                    r === e && r._order.indexOf(this) <= n && (n -= 1), this.setParent(t._parent, n + 1);
                }),
                (a.bringToFront = function () {
                    if (!this.isRoot()) {
                        var t = this._parent._order.length;
                        this.setParent(this._parent, t);
                    }
                }),
                (a.getAncestors = function () {
                    for (var t = this._parent, e = []; null !== t; ) e.push(t), (t = t._parent);
                    return e;
                }),
                (a.getChildren = function () {
                    return this._order.slice();
                }),
                (a.getDescendants = function () {
                    var t, e, n, r;
                    for (r = [], e = this.getChildren(), t = 0; t < e.length; t += 1) (n = e[t]), (r = r.concat(n, n.getDescendants()));
                    return r;
                }),
                (a.getFirstChild = function () {
                    return this._order.length < 1 ? null : this._order[0];
                }),
                (a.getLastChild = function () {
                    return this._order.length < 1 ? null : this._order[this._order.length - 1];
                }),
                (a.getNextSibling = function () {
                    return this._nextSibling;
                }),
                (a.getParent = function () {
                    return this._parent;
                }),
                (a.getPreviousSibling = function () {
                    return this._prevSibling;
                }),
                (a.getRootParent = function () {
                    return null === this._parent ? this : this._parent.getRootParent();
                }),
                (a.hasChild = function (t) {
                    return t._parent === this;
                }),
                (a.hasDescendant = function (t) {
                    for (var e = t._parent; null !== e && e !== this; ) e = e._parent;
                    return null !== e;
                }),
                (a.isRoot = function () {
                    return null === this._parent;
                }),
                (a.remove = function () {
                    return this.setParent(null);
                }),
                (a.sendBelow = function (t) {
                    if (t.isRoot()) throw new Error("Cannot bring before a root node.");
                    var e = t._parent,
                        n = e._order.indexOf(t),
                        r = this._parent;
                    r === e && r._order.indexOf(this) < n && (n -= 1), this.setParent(t._parent, n);
                }),
                (a.sendToBack = function () {
                    this.isRoot() || this.setParent(this._parent, 0);
                }),
                (a.setParent = function (t, e) {
                    if (void 0 === t) throw new Error("Parameter 'newParent' is required.");
                    void 0 === e && null !== t && (e = t._order.length);
                    var n = this._parent;
                    if (null === n)
                        if (null === t);
                        else {
                            if (this === t || this.hasDescendant(t)) throw new Error("Cyclic parent-child relationships are forbidden.");
                            t._addChild(this, e), this.emit("added", { source: this, newParent: t, oldParent: null }), t.emit("childAdded", { source: t, newChild: this, oldParent: null });
                        }
                    else if (null === t) n._removeChild(this), this.emit("removed", { source: this, newParent: null, oldParent: n }), n.emit("childRemoved", { source: n, oldChild: this, newParent: null });
                    else {
                        if (this === t || this.hasDescendant(t)) throw new Error("Cyclic parent-child relationships are forbidden.");
                        n._removeChild(this),
                            t._addChild(this, e),
                            this.emit("removed", { source: this, newParent: t, oldParent: n }),
                            n.emit("childRemoved", { source: n, oldChild: this, newParent: t }),
                            this.emit("added", { source: this, newParent: t, oldParent: n }),
                            t.emit("childAdded", { source: t, newChild: this, oldParent: n });
                    }
                }),
                (a._addChild = function (t, e) {
                    var n = t,
                        r = this._order[e - 1],
                        i = this._order[e];
                    (n._parent = this),
                        r ? ((n._prevSibling = r), (r._nextSibling = n)) : (n._prevSibling = null),
                        i ? ((n._nextSibling = i), (i._prevSibling = n)) : (n._nextSibling = null),
                        (this._children[n.id] = n),
                        this._order.splice(e, 0, n);
                }),
                (a._removeChild = function (t) {
                    var e = t,
                        n = e._prevSibling,
                        r = e._nextSibling;
                    (e._parent = null), (e._prevSibling = null), (e._nextSibling = null), n && (n._nextSibling = r), r && (r._prevSibling = n), delete this._children[e.id], this._order.splice(this._order.indexOf(e), 1);
                }),
                (t.exports = s);
        },
        function (t, e, n) {
            "use strict";
            function r(t) {
                if (!(this instanceof r)) return new r(t);
                null == t && (t = (Math.random() - 0.5) * Math.pow(2, 32)), (this._id = 0 | t);
            }
            (t.exports = r),
                (r.prototype.next = function () {
                    return (this._id = (this._id + 1) | 0), this._id;
                });
        },
        function (t, e, n) {
            var r = n(45),
                i = n(46),
                o = n(10),
                s = n(9),
                a = n(0),
                h = function (t) {
                    if ((o.call(this), (this._el = null), (this._elements = {}), (this._handlers = {}), (this._viewHandlers = {}), "object" == typeof t)) {
                        if (!(t instanceof s)) throw new Error("Parent of a View must be a Space.");
                        this.setParent(t);
                    }
                },
                u = a({}, o.prototype);
            (h.prototype = u),
                (u.fitScale = function (t) {
                    if (!this.isMounted()) throw new Error("View is not yet mounted and thus has no proper size for fitting. Call mount() before fitScale().");
                    return o.prototype.fitScale.call(this, t);
                }),
                (u.fitSize = function () {
                    throw new Error("Use refreshSize to resize the view and fitScale to fit.");
                }),
                (u.getElementBySpaceItem = function (t) {
                    var e = this._elements[t.id];
                    return e || null;
                }),
                (u.getContainer = function () {
                    return this._el;
                }),
                (u.getSpaceItemByElementId = function (t) {
                    var e = document.getElementById(t);
                    return e && e.hasOwnProperty("_tapspace_node") ? e._tapspace_node : null;
                }),
                (u.isMounted = function () {
                    return null !== this._el;
                }),
                (u.mount = function (t) {
                    if (!(t && "tagName" in t)) throw new Error("Container should be a DOM Element");
                    if (this._el !== t) {
                        this.unmount(),
                            (this._el = t),
                            (this._el.style.position = "relative"),
                            (this._el.style.overflow = "hidden"),
                            (this._el.style.display = "block"),
                            this._setSize(this._el.clientWidth, this._el.clientHeight),
                            this._parent && this._renderElementFor(this._parent);
                        var e = this;
                        (this._viewHandlers = {
                            added: function () {
                                e._renderElementFor(e._parent);
                            },
                            transformed: function () {
                                var t, n, r, o;
                                (t = e._elements[e._parent.id]), (n = e._elements[e.id]), (r = e._T.inverse()), (o = e._T), i(t, r), i(n, o);
                            },
                        }),
                            this.on("added", this._viewHandlers.added),
                            this.on("transformed", this._viewHandlers.transformed);
                    }
                });
            var l = u.setParent;
            (u.setParent = function (t) {
                if (!(t instanceof s)) throw new Error("A View can only be a child of a Space");
                this._parent !== t && (null !== this._parent && this._removeElementOf(this._parent), l.call(this, t));
            }),
                (u.unmount = function () {
                    this.isMounted() &&
                        (this.off("added", this._viewHandlers.added), this.off("transformed", this._viewHandlers.transformed), (this._viewHandlers = {}), this._parent && this._removeElementOf(this._parent), (this._el = null));
                }),
                (u.refreshSize = function () {
                    if (!this.isMounted()) throw new Error("Unmounted view cannot be resized.");
                    this._setSize(this._el.clientWidth, this._el.clientHeight);
                }),
                (u.setSize = function () {
                    throw new Error("Use refreshSize to resize the view.");
                }),
                (u.setISize = function () {
                    throw new Error("Use refreshSize to resize the view.");
                }),
                (u._getViewSpecificId = function (t) {
                    return this.id + "-" + t;
                }),
                (u._removeElementOf = function (t) {
                    var e,
                        n,
                        r = this,
                        i = t;
                    if (!this.isMounted()) throw new Error("Cannot remove element when view is not mounted.");
                    i.getChildren().forEach(function (t) {
                        r._removeElementOf(t);
                    }),
                        (n = this._handlers[i.id]),
                        i === this || i === this._parent ? i.off("childAdded", n.childAdded) : (i.off("childAdded", n.childAdded), i.off("removed", n.removed), i.off("resized", n.resized), i.off("transformed", n.transformed)),
                        (e = this._elements[i.id]),
                        delete e._tapspace_node,
                        delete this._elements[i.id],
                        delete this._handlers[i.id],
                        e.parentElement.removeChild(e);
                }),
                (u._renderElementFor = function (t) {
                    var e,
                        n,
                        s,
                        a = this,
                        u = t;
                    if (!this.isMounted()) throw new Error("Do not render elements before mounting the view");
                    if (this._elements.hasOwnProperty(u.id)) throw new Error("An element should not be added twice to the same view.");
                    (e = r(u, h)),
                        (e.id = this._getViewSpecificId(u.id)),
                        (e._tapspace_node = u),
                        (this._elements[u.id] = e),
                        u === this._parent
                            ? (this._el.appendChild(e),
                              (s = {
                                  childAdded: function (t) {
                                      t.newChild !== a && (t.oldParent === t.source ? a._reorderElementOf(t.newChild) : a._renderElementFor(t.newChild));
                                  },
                              }),
                              u.on("childAdded", s.childAdded))
                            : ((n = this._elements[u.getParent().id]),
                              n.appendChild(e),
                              u === this
                                  ? ((s = {
                                        childAdded: function (t) {
                                            t.oldParent === t.source ? a._reorderElementOf(t.newChild) : a._renderElementFor(t.newChild);
                                        },
                                    }),
                                    u.on("childAdded", s.childAdded))
                                  : ((s = {
                                        childAdded: function (t) {
                                            t.oldParent === t.source ? a._reorderElementOf(t.newChild) : a._renderElementFor(t.newChild);
                                        },
                                        removed: function (t) {
                                            t.oldParent === t.newParent || a._removeElementOf(u);
                                        },
                                        resized: function () {
                                            a._resizeElementOf(u);
                                        },
                                        transformed: function () {
                                            i(a._elements[u.id], u._T);
                                        },
                                    }),
                                    u.on("childAdded", s.childAdded),
                                    u.on("removed", s.removed),
                                    u.on("resized", s.resized),
                                    u.on("transformed", s.transformed),
                                    u instanceof o && s.resized(),
                                    s.transformed())),
                        (this._handlers[u.id] = s),
                        u.getChildren().forEach(function (t) {
                            a._renderElementFor(t);
                        });
                }),
                (u._reorderElementOf = function (t) {
                    var e, n, r, i;
                    (e = this._elements[t.id]), (n = this._elements[t._parent.id]), (r = t.getNextSibling()), r ? ((i = this._elements[r.id]), n.insertBefore(e, i)) : n.appendChild(e);
                }),
                (u._resizeElementOf = function (t) {
                    var e, n;
                    (n = t.getSize()), (e = this._elements[t.id]), (e.style.width = n.width + "px"), (e.style.height = n.height + "px");
                }),
                (u._setSize = o.prototype.setSize),
                (t.exports = h);
        },
        function (t, e, n) {
            var r = n(9),
                i = n(20),
                o = n(21),
                s = n(22),
                a = n(23);
            t.exports = function (t, e) {
                var n,
                    h,
                    u = t;
                if (u instanceof s) (n = u.image.cloneNode()), (n.className = "tapspace-image");
                else if (u instanceof o) (n = document.createElement("div")), (n.innerHTML = u.html), (n.className = "tapspace-html");
                else {
                    if (!(u instanceof a)) {
                        if (u instanceof e)
                            return (
                                (n = document.createElement("div")),
                                (n.className = "tapspace-view"),
                                (n.style.width = "0px"),
                                (n.style.height = "0px"),
                                (n.style.display = "inline-block"),
                                (n.style.position = "absolute"),
                                (n.style.transformOrigin = "0 0"),
                                n
                            );
                        if (u instanceof i)
                            return (
                                (n = document.createElement("div")),
                                (n.className = "tapspace-group"),
                                (n.style.width = "0px"),
                                (n.style.height = "0px"),
                                (n.style.display = "inline-block"),
                                (n.style.position = "absolute"),
                                (n.style.transformOrigin = "0 0"),
                                n
                            );
                        if (u instanceof r)
                            return (
                                (n = document.createElement("div")),
                                (n.className = "tapspace-space"),
                                (n.style.width = "0px"),
                                (n.style.height = "0px"),
                                (n.style.display = "inline-block"),
                                (n.style.position = "absolute"),
                                (n.style.transformOrigin = "0 0"),
                                n
                            );
                        throw new Error("Unknown AbstractNode subtype; cannot represent");
                    }
                    (n = document.createElement("div")), (n.className = "tapspace-pixel"), (n.style.backgroundColor = u.color);
                }
                return (h = u.getSize()), (n.style.width = h.width + "px"), (n.style.height = h.height + "px"), (n.style.display = "inline-block"), (n.style.position = "absolute"), (n.style.transformOrigin = "0 0"), n;
            };
        },
        function (t, e) {
            t.exports = function (t, e) {
                var n, r, i, o, s;
                (n = e.s.toFixed(8)), (r = e.r.toFixed(8)), (i = (-e.r).toFixed(8)), (o = e.tx.toFixed(8)), (s = e.ty.toFixed(8)), (t.style.transform = "matrix(" + n + "," + r + "," + i + "," + n + "," + o + "," + s + ")");
            };
        },
        function (t, e, n) {
            var r = n(15),
                i = n(48),
                o = n(50),
                s = n(11),
                a = new o(),
                h = function (t, e, n) {
                    if ((r(this), null === t.getContainer())) throw new Error("Touchable requires a mounted view.");
                    if (((this.view = t), (this.item = e), (this.targetItem = void 0 === n ? e : n), t === e)) this.element = this.view.getContainer();
                    else if (((this.element = this.view.getElementBySpaceItem(this.item)), null === this.element)) throw new Error("No HTMLElement found. Ensure the item is in the same space with the view.");
                    (this.mode = h.DEFAULT_MODE), (this._rec = null);
                };
            (h.DEFAULT_MODE = { rotate: !1, scale: !1, translate: !1, tap: !1, tapMaxTravel: 20, pivot: null, preventDefault: !0 }),
                (h.prototype.start = function (t) {
                    a.start(this.view), (this.mode = s.extend(h.DEFAULT_MODE, t)), null === this._rec ? (this._rec = new i(this)) : this._rec.update(this.mode);
                }),
                (h.prototype.restart = function (t) {
                    return this.start(t);
                }),
                (h.prototype.resume = function () {
                    null === this._rec && this.start(this.mode);
                }),
                (h.prototype.stop = function () {
                    null !== this._rec && (this._rec.destroy(), (this._rec = null), a.stop(this.view));
                }),
                (t.exports = h);
        },
        function (t, e, n) {
            var r = n(49),
                i = n(11),
                o = n(12),
                s = function (t, e) {
                    return t.pivot ? t.pivot.to(e).toArray() : !1 === t.translate ? e.atMid().to(e).toArray() : void 0;
                },
                a = function (t, e, n) {
                    if (e === n) return t;
                    var r,
                        i = {},
                        o = e.getGlobalTransform(),
                        s = n.getGlobalTransform(),
                        a = s.inverse().multiplyRight(o);
                    for (r in t) t.hasOwnProperty(r) && (i[r] = a.transform(t[r]));
                    return i;
                },
                h = function (t, e) {
                    var n,
                        r = {};
                    for (n in t) t.hasOwnProperty(n) && (r[n] = e.transform(t[n]));
                    return r;
                },
                u = function (t) {
                    var e = this;
                    this.man = t;
                    var n = null,
                        u = null,
                        l = {},
                        f = function (t) {
                            var r = e.man.targetItem,
                                i = e.man.view,
                                o = e.man.element;
                            (n = Date.now()), (u = 0), (l = a(t, i, r)), e.man.emit("gesturestart", { distance: 0, duration: 0, element: o, item: r });
                        },
                        c = function (t, r) {
                            var f,
                                c,
                                d,
                                p,
                                m,
                                v,
                                g = [],
                                y = [],
                                w = e.man.element,
                                _ = e.man.view,
                                x = e.man.targetItem,
                                b = e.man.mode,
                                E = a(r, _, x);
                            for (f in l) l.hasOwnProperty(f) && E.hasOwnProperty(f) && (g.push(l[f]), y.push(E[f]));
                            c = g.length;
                            for (f in t) t.hasOwnProperty(f) && r.hasOwnProperty(f) && ((u += Math.abs(t[f][0] - r[f][0]) / c), (u += Math.abs(t[f][1] - r[f][1]) / c));
                            (d = s(b, x)),
                                (p = i.convertToTransformationType(b)),
                                (m = o.estimate(p, g, y, d)),
                                _ === x ? ((l = E), (v = x._T.multiplyRight(m.inverse())), x.setLocalTransform(v)) : ((l = h(E, m.inverse())), (v = x._T.multiplyRight(m)), x.setLocalTransform(v)),
                                e.man.emit("gesturemove", { distance: u, duration: Date.now() - n, element: w, item: x });
                        },
                        d = function (t) {
                            var r = e.man.element,
                                i = e.man.targetItem,
                                o = e.man.mode;
                            e.man.emit("gestureend", { distance: u, duration: Date.now() - n, element: r, item: i }),
                                (l = {}),
                                o.tap && u < o.tapMaxTravel && e.man.emit("tap", { distance: u, duration: Date.now() - n, element: r, item: i });
                        };
                    this.sensor = new r(this.man.element, { start: f, move: c, end: d }, this.man.mode);
                };
            (u.prototype.update = function (t) {
                this.sensor.update(t);
            }),
                (u.prototype.destroy = function () {
                    this.sensor.destroy();
                }),
                (t.exports = u);
        },
        function (t, e, n) {
            var r = n(11);
            t.exports = function (t, e, n) {
                var i = {},
                    o = n.preventDefault,
                    s = e,
                    a = t,
                    h = !1,
                    u = !1,
                    l = {},
                    f = function (t) {
                        var e, n, i;
                        if (!t.defaultPrevented) {
                            for (o && t.preventDefault(), i = r.clone(l), e = t.changedTouches, n = 0; n < e.length; n += 1) i[e[n].identifier] = [e[n].pageX, e[n].pageY];
                            h || ((h = !0), s.start(i)), (l = i);
                        }
                    },
                    c = function (t) {
                        var e, n, i, a;
                        if (!t.defaultPrevented) {
                            for (o && t.preventDefault(), a = r.clone(l), e = t.changedTouches, n = 0; n < e.length; n += 1) (i = e[n].identifier), a.hasOwnProperty(i) && (a[i] = [e[n].pageX, e[n].pageY]);
                            h && s.move(l, a), (l = a);
                        }
                    },
                    d = function (t) {
                        var e, n, i;
                        if (!t.defaultPrevented) {
                            for (o && t.preventDefault(), i = r.clone(l), e = t.changedTouches, n = 0; n < e.length; n += 1) delete i[e[n].identifier];
                            r.cardinality(i) < 1 && ((h = !1), s.end(l)), (l = i);
                        }
                    },
                    p = function (t) {
                        var e;
                        t.defaultPrevented || (o && t.preventDefault(), u || ((u = !0), (e = r.clone(l)), (e.mouse = [t.pageX, t.pageY]), h || ((h = !0), s.start(e)), (l = e)));
                    },
                    m = function (t) {
                        var e;
                        u && !t.defaultPrevented && (o && t.preventDefault(), (e = r.clone(l)), (e.mouse = [t.pageX, t.pageY]), s.move(l, e), (l = e));
                    },
                    v = function (t) {
                        var e;
                        u && !t.defaultPrevented && ((u = !1), o && t.preventDefault(), (e = r.clone(l)), delete e.mouse, r.cardinality(e) < 1 && ((h = !1), s.end(l)), (l = e));
                    };
                a.addEventListener("touchstart", f),
                    a.addEventListener("touchmove", c),
                    a.addEventListener("touchend", d),
                    a.addEventListener("touchcancel", d),
                    a.addEventListener("ratstart", p),
                    a.addEventListener("ratmove", m),
                    a.addEventListener("ratend", v),
                    (i.touchstart = f),
                    (i.touchmove = c),
                    (i.touchend = d),
                    (i.touchcancel = d),
                    (i.ratstart = p),
                    (i.ratmove = m),
                    (i.ratend = v),
                    (this.update = function (t) {
                        o = t.preventDefault;
                    }),
                    (this.destroy = function () {
                        for (var t in i) i.hasOwnProperty(t) && a.removeEventListener(t, i[t]);
                        i = null;
                    });
            };
        },
        function (t, e) {
            var n = function (t) {
                    var e = !1,
                        n = null,
                        r = function (t) {
                            if (!e && !t.defaultPrevented) {
                                (e = !0), (n = t.target);
                                var r = document.createEvent("Event");
                                r.initEvent("ratstart", !0, !0), (r.target = n), (r.pageX = t.pageX), (r.pageY = t.pageY);
                                !n.dispatchEvent(r) && t.preventDefault();
                            }
                        },
                        i = function (t) {
                            if (e && !t.defaultPrevented) {
                                var r = document.createEvent("Event");
                                r.initEvent("ratmove", !0, !0), (r.target = n), (r.pageX = t.pageX), (r.pageY = t.pageY);
                                !n.dispatchEvent(r) && t.preventDefault();
                            }
                        },
                        o = function (t) {
                            if (e && !t.defaultPrevented) {
                                e = !1;
                                var r = document.createEvent("Event");
                                r.initEvent("ratend", !0, !0), (r.target = n), (r.pageX = t.pageX), (r.pageY = t.pageY);
                                !n.dispatchEvent(r) && t.preventDefault(), (n = null);
                            }
                        },
                        s = function (t) {
                            t.stopPropagation();
                        };
                    return (
                        t.addEventListener("mousedown", r),
                        t.addEventListener("mousemove", i),
                        t.addEventListener("mouseup", o),
                        t.addEventListener("mouseleave", o),
                        t.addEventListener("ratstart", s),
                        t.addEventListener("ratmove", s),
                        t.addEventListener("ratend", s),
                        { container: t, mousedown: r, mousemove: i, mouseup: o, mouseleave: o, ratstart: s, ratmove: s, ratend: s }
                    );
                },
                r = function (t) {
                    var e = t,
                        n = e.container;
                    n.removeEventListener("mousedown", e.mousedown),
                        n.removeEventListener("mousemove", e.mousemove),
                        n.removeEventListener("mouseup", e.mouseup),
                        n.removeEventListener("mouseleave", e.mouseleave),
                        n.removeEventListener("ratstart", e.ratstart),
                        n.removeEventListener("ratmove", e.ratmove),
                        n.removeEventListener("ratend", e.ratend);
                },
                i = function () {
                    (this.numRunning = {}), (this.handlers = {});
                };
            (i.prototype.start = function (t) {
                if (this.numRunning.hasOwnProperty(t.id)) return void (this.numRunning[t.id] += 1);
                (this.numRunning[t.id] = 1), (this.handlers[t.id] = n(t.getContainer()));
            }),
                (i.prototype.stop = function (t) {
                    if (!this.numRunning.hasOwnProperty(t.id)) throw new Error("Stop called before start.");
                    (this.numRunning[t.id] -= 1), this.numRunning[t.id] < 1 && (r(this.handlers[t.id]), delete this.numRunning[t.id], delete this.handlers[t.id]);
                }),
                (t.exports = i);
        },
        function (t, e, n) {
            var r = n(15),
                i = n(52),
                o = n(11),
                s = function (t, e) {
                    if ((r(this), null === t.getContainer())) throw new Error("Wheelable requires a mounted view.");
                    if (((this.view = t), (this.item = e), t === e)) this.element = this.view.getContainer();
                    else if (((this.element = this.view.getElementBySpaceItem(this.item)), null === this.element)) throw new Error("No HTMLElement found. Ensure the item is in the same space with the view.");
                    (this.mode = s.DEFAULT_MODE), (this._rec = null);
                };
            (s.DEFAULT_MODE = { rotate: !1, scale: !1, translate: !1 }),
                (s.prototype.start = function (t) {
                    var e, n, r;
                    (this.mode = o.extend(s.DEFAULT_MODE, t)), null === this._rec ? ((e = this.element), (n = this.item), (r = this.view), (this._rec = new i(e, n, r, this, this.mode))) : this._rec.update(this.mode);
                }),
                (s.prototype.restart = function (t) {
                    return this.start(t);
                }),
                (s.prototype.resume = function () {
                    null === this._rec && this.start(this.mode);
                }),
                (s.prototype.stop = function () {
                    null !== this._rec && (this._rec.destroy(), (this._rec = null));
                }),
                (t.exports = s);
        },
        function (t, e, n) {
            var r = n(5),
                i = n(8),
                o = n(2),
                s = n(3),
                a = function (t, e, n, a, h) {
                    var u = this;
                    (this.element = t), (this.item = e), (this.view = n), (this.mode = h);
                    var l = function (t) {
                        t.preventDefault();
                        var e, n, a, h, l, f, c, d;
                        (h = t.pageX),
                            (l = t.pageY),
                            (f = t.deltaX),
                            (c = t.deltaY),
                            (d = t.deltaZ),
                            (n = i.IDENTITY),
                            u.mode.translate
                                ? u.mode.scale
                                    ? ((a = new s(new o(h, l), u.view)), (n = n.scale(a, 1 + c / 1e3).translate(u.view.at(0, 0), u.view.at(f, 0))))
                                    : ((e = new r(1, 0, f, c)), (n = new i(e, u.view)))
                                : u.mode.scale && ((a = new s(new o(h, l), u.view)), (n = n.scale(a, 1 + c / 1e3))),
                            u.mode.rotate && ((a = new s(new o(h, l), u.view)), (n = n.rotate(a, d / 1e3))),
                            u.view === u.item ? u.view.transformBy(n) : u.item.transformBy(n.inverse());
                    };
                    this.element.addEventListener("wheel", l), (this.listener = l);
                };
            (a.prototype.update = function (t) {
                this.mode = t;
            }),
                (a.prototype.destroy = function () {
                    this.element.removeEventListener("wheel", this.listener);
                }),
                (t.exports = a);
        },
        function (t, e) {
            t.exports = function (t, e) {
                var n, r, o, s, a, h, u, l;
                if ("function" != typeof e) throw new Error("callback should be a function: " + e);
                for (
                    "string" == typeof t ? ((n = 1), (r = !0), (t = [t])) : ((n = t.length), (r = !1)),
                        o = !1,
                        s = !1,
                        a = [],
                        h = 0,
                        u = function () {
                            if (!s) {
                                h += 1;
                                h === n && ((o = !0), r ? e(null, a[0]) : e(null, a));
                            }
                        },
                        l = function (t) {
                            return o || ((s = !0), e(t, null)), !0;
                        },
                        i = 0;
                    i < t.length;
                    i += 1
                )
                    a.push(new Image()), (a[i].onload = u), (a[i].onabort = l), (a[i].onerror = l), (a[i].src = t[i]);
            };
        },
        function (t, e) {
            t.exports = "1.2.0";
        },
    ]);
});
//# sourceMappingURL=tapspace.min.js.map
