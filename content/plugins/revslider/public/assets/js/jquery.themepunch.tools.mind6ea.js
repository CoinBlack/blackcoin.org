/********************************************
	-	THEMEPUNCH TOOLS Ver. 1.0     -
	 Last Update of Tools 27.02.2015
*********************************************/


/*
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.9
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.skinkers.com/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 *
 * Copyright (c) 2010 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */


(function (a) {
	if (typeof define === "function" && define.amd && define.amd.jQuery) {
		define(["jquery"], a)
	} else {
		a(jQuery)
	}
}(function (f) {
	var y = "1.6.9",
		p = "left",
		o = "right",
		e = "up",
		x = "down",
		c = "in",
		A = "out",
		m = "none",
		s = "auto",
		l = "swipe",
		t = "pinch",
		B = "tap",
		j = "doubletap",
		b = "longtap",
		z = "hold",
		E = "horizontal",
		u = "vertical",
		i = "all",
		r = 10,
		g = "start",
		k = "move",
		h = "end",
		q = "cancel",
		a = "ontouchstart" in window,
		v = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
		d = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
		C = "TouchSwipe";
	var n = {
		fingers: 1,
		threshold: 75,
		cancelThreshold: null,
		pinchThreshold: 20,
		maxTimeThreshold: null,
		fingerReleaseThreshold: 250,
		longTapThreshold: 500,
		doubleTapThreshold: 200,
		swipe: null,
		swipeLeft: null,
		swipeRight: null,
		swipeUp: null,
		swipeDown: null,
		swipeStatus: null,
		pinchIn: null,
		pinchOut: null,
		pinchStatus: null,
		click: null,
		tap: null,
		doubleTap: null,
		longTap: null,
		hold: null,
		triggerOnTouchEnd: true,
		triggerOnTouchLeave: false,
		allowPageScroll: "auto",
		fallbackToMouseEvents: true,
		excludedElements: "label, button, input, select, textarea, a, .noSwipe",
		preventDefaultEvents: true
	};
	f.fn.swipetp = function (H) {
		var G = f(this),
			F = G.data(C);
		if (F && typeof H === "string") {
			if (F[H]) {
				return F[H].apply(this, Array.prototype.slice.call(arguments, 1))
			} else {
				f.error("Method " + H + " does not exist on jQuery.swipetp")
			}
		} else {
			if (!F && (typeof H === "object" || !H)) {
				return w.apply(this, arguments)
			}
		}
		return G
	};
	f.fn.swipetp.version = y;
	f.fn.swipetp.defaults = n;
	f.fn.swipetp.phases = {
		PHASE_START: g,
		PHASE_MOVE: k,
		PHASE_END: h,
		PHASE_CANCEL: q
	};
	f.fn.swipetp.directions = {
		LEFT: p,
		RIGHT: o,
		UP: e,
		DOWN: x,
		IN: c,
		OUT: A
	};
	f.fn.swipetp.pageScroll = {
		NONE: m,
		HORIZONTAL: E,
		VERTICAL: u,
		AUTO: s
	};
	f.fn.swipetp.fingers = {
		ONE: 1,
		TWO: 2,
		THREE: 3,
		ALL: i
	};

	function w(F) {
		if (F && (F.allowPageScroll === undefined && (F.swipe !== undefined || F.swipeStatus !== undefined))) {
			F.allowPageScroll = m
		}
		if (F.click !== undefined && F.tap === undefined) {
			F.tap = F.click
		}
		if (!F) {
			F = {}
		}
		F = f.extend({}, f.fn.swipetp.defaults, F);
		return this.each(function () {
			var H = f(this);
			var G = H.data(C);
			if (!G) {
				G = new D(this, F);
				H.data(C, G)
			}
		})
	}

	function D(a5, aw) {
		var aA = (a || d || !aw.fallbackToMouseEvents),
			K = aA ? (d ? (v ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
			az = aA ? (d ? (v ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
			V = aA ? (d ? (v ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
			T = aA ? null : "mouseleave",
			aE = (d ? (v ? "MSPointerCancel" : "pointercancel") : "touchcancel");
		var ah = 0,
			aQ = null,
			ac = 0,
			a2 = 0,
			a0 = 0,
			H = 1,
			ar = 0,
			aK = 0,
			N = null;
		var aS = f(a5);
		var aa = "start";
		var X = 0;
		var aR = null;
		var U = 0,
			a3 = 0,
			a6 = 0,
			ae = 0,
			O = 0;
		var aX = null,
			ag = null;
		try {
			aS.bind(K, aO);
			aS.bind(aE, ba)
		} catch (al) {
			f.error("events not supported " + K + "," + aE + " on jQuery.swipetp")
		}
		this.enable = function () {
			aS.bind(K, aO);
			aS.bind(aE, ba);
			return aS
		};
		this.disable = function () {
			aL();
			return aS
		};
		this.destroy = function () {
			aL();
			aS.data(C, null);
			aS = null
		};
		this.option = function (bd, bc) {
			if (aw[bd] !== undefined) {
				if (bc === undefined) {
					return aw[bd]
				} else {
					aw[bd] = bc
				}
			} else {
				f.error("Option " + bd + " does not exist on jQuery.swipetp.options")
			}
			return null
		};

		function aO(be) {
			if (aC()) {
				return
			}
			if (f(be.target).closest(aw.excludedElements, aS).length > 0) {
				return
			}
			var bf = be.originalEvent ? be.originalEvent : be;
			var bd, bg = bf.touches,
				bc = bg ? bg[0] : bf;
			aa = g;
			if (bg) {
				X = bg.length
			} else {
				be.preventDefault()
			}
			ah = 0;
			aQ = null;
			aK = null;
			ac = 0;
			a2 = 0;
			a0 = 0;
			H = 1;
			ar = 0;
			aR = ak();
			N = ab();
			S();
			if (!bg || (X === aw.fingers || aw.fingers === i) || aY()) {
				aj(0, bc);
				U = au();
				if (X == 2) {
					aj(1, bg[1]);
					a2 = a0 = av(aR[0].start, aR[1].start)
				}
				if (aw.swipeStatus || aw.pinchStatus) {
					bd = P(bf, aa)
				}
			} else {
				bd = false
			}
			if (bd === false) {
				aa = q;
				P(bf, aa);
				return bd
			} else {
				if (aw.hold) {
					ag = setTimeout(f.proxy(function () {
						aS.trigger("hold", [bf.target]);
						if (aw.hold) {
							bd = aw.hold.call(aS, bf, bf.target)
						}
					}, this), aw.longTapThreshold)
				}
				ap(true)
			}
			return null
		}

		function a4(bf) {
			var bi = bf.originalEvent ? bf.originalEvent : bf;
			if (aa === h || aa === q || an()) {
				return
			}
			var be, bj = bi.touches,
				bd = bj ? bj[0] : bi;
			var bg = aI(bd);
			a3 = au();
			if (bj) {
				X = bj.length
			}
			if (aw.hold) {
				clearTimeout(ag)
			}
			aa = k;
			if (X == 2) {
				if (a2 == 0) {
					aj(1, bj[1]);
					a2 = a0 = av(aR[0].start, aR[1].start)
				} else {
					aI(bj[1]);
					a0 = av(aR[0].end, aR[1].end);
					aK = at(aR[0].end, aR[1].end)
				}
				H = a8(a2, a0);
				ar = Math.abs(a2 - a0)
			}
			if ((X === aw.fingers || aw.fingers === i) || !bj || aY()) {
				aQ = aM(bg.start, bg.end);
				am(bf, aQ);
				ah = aT(bg.start, bg.end);
				ac = aN();
				aJ(aQ, ah);
				if (aw.swipeStatus || aw.pinchStatus) {
					be = P(bi, aa)
				}
				if (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave) {
					var bc = true;
					if (aw.triggerOnTouchLeave) {
						var bh = aZ(this);
						bc = F(bg.end, bh)
					}
					if (!aw.triggerOnTouchEnd && bc) {
						aa = aD(k)
					} else {
						if (aw.triggerOnTouchLeave && !bc) {
							aa = aD(h)
						}
					}
					if (aa == q || aa == h) {
						P(bi, aa)
					}
				}
			} else {
				aa = q;
				P(bi, aa)
			}
			if (be === false) {
				aa = q;
				P(bi, aa)
			}
		}

		function M(bc) {
			var bd = bc.originalEvent ? bc.originalEvent : bc,
				be = bd.touches;
			if (be) {
				if (be.length) {
					G();
					return true
				}
			}
			if (an()) {
				X = ae
			}
			a3 = au();
			ac = aN();
			if (bb() || !ao()) {
				aa = q;
				P(bd, aa)
			} else {
				if (aw.triggerOnTouchEnd || (aw.triggerOnTouchEnd == false && aa === k)) {
					bc.preventDefault();
					aa = h;
					P(bd, aa)
				} else {
					if (!aw.triggerOnTouchEnd && a7()) {
						aa = h;
						aG(bd, aa, B)
					} else {
						if (aa === k) {
							aa = q;
							P(bd, aa)
						}
					}
				}
			}
			ap(false);
			return null
		}

		function ba() {
			X = 0;
			a3 = 0;
			U = 0;
			a2 = 0;
			a0 = 0;
			H = 1;
			S();
			ap(false)
		}

		function L(bc) {
			var bd = bc.originalEvent ? bc.originalEvent : bc;
			if (aw.triggerOnTouchLeave) {
				aa = aD(h);
				P(bd, aa)
			}
		}

		function aL() {
			aS.unbind(K, aO);
			aS.unbind(aE, ba);
			aS.unbind(az, a4);
			aS.unbind(V, M);
			if (T) {
				aS.unbind(T, L)
			}
			ap(false)
		}

		function aD(bg) {
			var bf = bg;
			var be = aB();
			var bd = ao();
			var bc = bb();
			if (!be || bc) {
				bf = q
			} else {
				if (bd && bg == k && (!aw.triggerOnTouchEnd || aw.triggerOnTouchLeave)) {
					bf = h
				} else {
					if (!bd && bg == h && aw.triggerOnTouchLeave) {
						bf = q
					}
				}
			}
			return bf
		}

		function P(be, bc) {
			var bd, bf = be.touches;
			if ((J() || W()) || (Q() || aY())) {
				if (J() || W()) {
					bd = aG(be, bc, l)
				}
				if ((Q() || aY()) && bd !== false) {
					bd = aG(be, bc, t)
				}
			} else {
				if (aH() && bd !== false) {
					bd = aG(be, bc, j)
				} else {
					if (aq() && bd !== false) {
						bd = aG(be, bc, b)
					} else {
						if (ai() && bd !== false) {
							bd = aG(be, bc, B)
						}
					}
				}
			}
			if (bc === q) {
				ba(be)
			}
			if (bc === h) {
				if (bf) {
					if (!bf.length) {
						ba(be)
					}
				} else {
					ba(be)
				}
			}
			return bd
		}

		function aG(bf, bc, be) {
			var bd;
			if (be == l) {
				aS.trigger("swipeStatus", [bc, aQ || null, ah || 0, ac || 0, X, aR]);
				if (aw.swipeStatus) {
					bd = aw.swipeStatus.call(aS, bf, bc, aQ || null, ah || 0, ac || 0, X, aR);
					if (bd === false) {
						return false
					}
				}
				if (bc == h && aW()) {
					aS.trigger("swipe", [aQ, ah, ac, X, aR]);
					if (aw.swipe) {
						bd = aw.swipe.call(aS, bf, aQ, ah, ac, X, aR);
						if (bd === false) {
							return false
						}
					}
					switch (aQ) {
						case p:
							aS.trigger("swipeLeft", [aQ, ah, ac, X, aR]);
							if (aw.swipeLeft) {
								bd = aw.swipeLeft.call(aS, bf, aQ, ah, ac, X, aR)
							}
							break;
						case o:
							aS.trigger("swipeRight", [aQ, ah, ac, X, aR]);
							if (aw.swipeRight) {
								bd = aw.swipeRight.call(aS, bf, aQ, ah, ac, X, aR)
							}
							break;
						case e:
							aS.trigger("swipeUp", [aQ, ah, ac, X, aR]);
							if (aw.swipeUp) {
								bd = aw.swipeUp.call(aS, bf, aQ, ah, ac, X, aR)
							}
							break;
						case x:
							aS.trigger("swipeDown", [aQ, ah, ac, X, aR]);
							if (aw.swipeDown) {
								bd = aw.swipeDown.call(aS, bf, aQ, ah, ac, X, aR)
							}
							break
					}
				}
			}
			if (be == t) {
				aS.trigger("pinchStatus", [bc, aK || null, ar || 0, ac || 0, X, H, aR]);
				if (aw.pinchStatus) {
					bd = aw.pinchStatus.call(aS, bf, bc, aK || null, ar || 0, ac || 0, X, H, aR);
					if (bd === false) {
						return false
					}
				}
				if (bc == h && a9()) {
					switch (aK) {
						case c:
							aS.trigger("pinchIn", [aK || null, ar || 0, ac || 0, X, H, aR]);
							if (aw.pinchIn) {
								bd = aw.pinchIn.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR)
							}
							break;
						case A:
							aS.trigger("pinchOut", [aK || null, ar || 0, ac || 0, X, H, aR]);
							if (aw.pinchOut) {
								bd = aw.pinchOut.call(aS, bf, aK || null, ar || 0, ac || 0, X, H, aR)
							}
							break
					}
				}
			}
			if (be == B) {
				if (bc === q || bc === h) {
					clearTimeout(aX);
					clearTimeout(ag);
					if (Z() && !I()) {
						O = au();
						aX = setTimeout(f.proxy(function () {
							O = null;
							aS.trigger("tap", [bf.target]);
							if (aw.tap) {
								bd = aw.tap.call(aS, bf, bf.target)
							}
						}, this), aw.doubleTapThreshold)
					} else {
						O = null;
						aS.trigger("tap", [bf.target]);
						if (aw.tap) {
							bd = aw.tap.call(aS, bf, bf.target)
						}
					}
				}
			} else {
				if (be == j) {
					if (bc === q || bc === h) {
						clearTimeout(aX);
						O = null;
						aS.trigger("doubletap", [bf.target]);
						if (aw.doubleTap) {
							bd = aw.doubleTap.call(aS, bf, bf.target)
						}
					}
				} else {
					if (be == b) {
						if (bc === q || bc === h) {
							clearTimeout(aX);
							O = null;
							aS.trigger("longtap", [bf.target]);
							if (aw.longTap) {
								bd = aw.longTap.call(aS, bf, bf.target)
							}
						}
					}
				}
			}
			return bd
		}

		function ao() {
			var bc = true;
			if (aw.threshold !== null) {
				bc = ah >= aw.threshold
			}
			return bc
		}

		function bb() {
			var bc = false;
			if (aw.cancelThreshold !== null && aQ !== null) {
				bc = (aU(aQ) - ah) >= aw.cancelThreshold
			}
			return bc
		}

		function af() {
			if (aw.pinchThreshold !== null) {
				return ar >= aw.pinchThreshold
			}
			return true
		}

		function aB() {
			var bc;
			if (aw.maxTimeThreshold) {
				if (ac >= aw.maxTimeThreshold) {
					bc = false
				} else {
					bc = true
				}
			} else {
				bc = true
			}
			return bc
		}

		function am(bc, bd) {
			if (aw.preventDefaultEvents === false) {
				return
			}
			if (aw.allowPageScroll === m) {
				bc.preventDefault()
			} else {
				var be = aw.allowPageScroll === s;
				switch (bd) {
					case p:
						if ((aw.swipeLeft && be) || (!be && aw.allowPageScroll != E)) {
							bc.preventDefault()
						}
						break;
					case o:
						if ((aw.swipeRight && be) || (!be && aw.allowPageScroll != E)) {
							bc.preventDefault()
						}
						break;
					case e:
						if ((aw.swipeUp && be) || (!be && aw.allowPageScroll != u)) {
							bc.preventDefault()
						}
						break;
					case x:
						if ((aw.swipeDown && be) || (!be && aw.allowPageScroll != u)) {
							bc.preventDefault()
						}
						break
				}
			}
		}

		function a9() {
			var bd = aP();
			var bc = Y();
			var be = af();
			return bd && bc && be
		}

		function aY() {
			return !!(aw.pinchStatus || aw.pinchIn || aw.pinchOut)
		}

		function Q() {
			return !!(a9() && aY())
		}

		function aW() {
			var bf = aB();
			var bh = ao();
			var be = aP();
			var bc = Y();
			var bd = bb();
			var bg = !bd && bc && be && bh && bf;
			return bg
		}

		function W() {
			return !!(aw.swipe || aw.swipeStatus || aw.swipeLeft || aw.swipeRight || aw.swipeUp || aw.swipeDown)
		}

		function J() {
			return !!(aW() && W())
		}

		function aP() {
			return ((X === aw.fingers || aw.fingers === i) || !a)
		}

		function Y() {
			return aR[0].end.x !== 0
		}

		function a7() {
			return !!(aw.tap)
		}

		function Z() {
			return !!(aw.doubleTap)
		}

		function aV() {
			return !!(aw.longTap)
		}

		function R() {
			if (O == null) {
				return false
			}
			var bc = au();
			return (Z() && ((bc - O) <= aw.doubleTapThreshold))
		}

		function I() {
			return R()
		}

		function ay() {
			return ((X === 1 || !a) && (isNaN(ah) || ah < aw.threshold))
		}

		function a1() {
			return ((ac > aw.longTapThreshold) && (ah < r))
		}

		function ai() {
			return !!(ay() && a7())
		}

		function aH() {
			return !!(R() && Z())
		}

		function aq() {
			return !!(a1() && aV())
		}

		function G() {
			a6 = au();
			ae = event.touches.length + 1
		}

		function S() {
			a6 = 0;
			ae = 0
		}

		function an() {
			var bc = false;
			if (a6) {
				var bd = au() - a6;
				if (bd <= aw.fingerReleaseThreshold) {
					bc = true
				}
			}
			return bc
		}

		function aC() {
			return !!(aS.data(C + "_intouch") === true)
		}

		function ap(bc) {
			if (bc === true) {
				aS.bind(az, a4);
				aS.bind(V, M);
				if (T) {
					aS.bind(T, L)
				}
			} else {
				aS.unbind(az, a4, false);
				aS.unbind(V, M, false);
				if (T) {
					aS.unbind(T, L, false)
				}
			}
			aS.data(C + "_intouch", bc === true)
		}

		function aj(bd, bc) {
			var be = bc.identifier !== undefined ? bc.identifier : 0;
			aR[bd].identifier = be;
			aR[bd].start.x = aR[bd].end.x = bc.pageX || bc.clientX;
			aR[bd].start.y = aR[bd].end.y = bc.pageY || bc.clientY;
			return aR[bd]
		}

		function aI(bc) {
			var be = bc.identifier !== undefined ? bc.identifier : 0;
			var bd = ad(be);
			bd.end.x = bc.pageX || bc.clientX;
			bd.end.y = bc.pageY || bc.clientY;
			return bd
		}

		function ad(bd) {
			for (var bc = 0; bc < aR.length; bc++) {
				if (aR[bc].identifier == bd) {
					return aR[bc]
				}
			}
		}

		function ak() {
			var bc = [];
			for (var bd = 0; bd <= 5; bd++) {
				bc.push({
					start: {
						x: 0,
						y: 0
					},
					end: {
						x: 0,
						y: 0
					},
					identifier: 0
				})
			}
			return bc
		}

		function aJ(bc, bd) {
			bd = Math.max(bd, aU(bc));
			N[bc].distance = bd
		}

		function aU(bc) {
			if (N[bc]) {
				return N[bc].distance
			}
			return undefined
		}

		function ab() {
			var bc = {};
			bc[p] = ax(p);
			bc[o] = ax(o);
			bc[e] = ax(e);
			bc[x] = ax(x);
			return bc
		}

		function ax(bc) {
			return {
				direction: bc,
				distance: 0
			}
		}

		function aN() {
			return a3 - U
		}

		function av(bf, be) {
			var bd = Math.abs(bf.x - be.x);
			var bc = Math.abs(bf.y - be.y);
			return Math.round(Math.sqrt(bd * bd + bc * bc))
		}

		function a8(bc, bd) {
			var be = (bd / bc) * 1;
			return be.toFixed(2)
		}

		function at() {
			if (H < 1) {
				return A
			} else {
				return c
			}
		}

		function aT(bd, bc) {
			return Math.round(Math.sqrt(Math.pow(bc.x - bd.x, 2) + Math.pow(bc.y - bd.y, 2)))
		}

		function aF(bf, bd) {
			var bc = bf.x - bd.x;
			var bh = bd.y - bf.y;
			var be = Math.atan2(bh, bc);
			var bg = Math.round(be * 180 / Math.PI);
			if (bg < 0) {
				bg = 360 - Math.abs(bg)
			}
			return bg
		}

		function aM(bd, bc) {
			var be = aF(bd, bc);
			if ((be <= 45) && (be >= 0)) {
				return p
			} else {
				if ((be <= 360) && (be >= 315)) {
					return p
				} else {
					if ((be >= 135) && (be <= 225)) {
						return o
					} else {
						if ((be > 45) && (be < 135)) {
							return x
						} else {
							return e
						}
					}
				}
			}
		}

		function au() {
			var bc = new Date();
			return bc.getTime()
		}

		function aZ(bc) {
			bc = f(bc);
			var be = bc.offset();
			var bd = {
				left: be.left,
				right: be.left + bc.outerWidth(),
				top: be.top,
				bottom: be.top + bc.outerHeight()
			};
			return bd
		}

		function F(bc, bd) {
			return (bc.x > bd.left && bc.x < bd.right && bc.y > bd.top && bc.y < bd.bottom)
		}
	}
}));

if (typeof (console) === 'undefined') {
	var console = {}
	console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.groupCollapsed = function () {};
}

if (window.tplogs == true)
	try {
		console.groupCollapsed("ThemePunch GreenSocks Logs");
	} catch (e) {}


var oldgs = window.GreenSockGlobals;
oldgs_queue = window._gsQueue;

var punchgs = window.GreenSockGlobals = {};

if (window.tplogs == true)
	try {
		console.info("Build GreenSock SandBox for ThemePunch Plugins");
		console.info("GreenSock TweenLite Engine Initalised by ThemePunch Plugin");
	} catch (e) {}

/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
(function (t, e) {
	"use strict";
	var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
	if (!i.TweenLite) {
		var s, n, r, a, o, l = function (t) {
				var e, s = t.split("."),
					n = i;
				for (e = 0; s.length > e; e++) n[s[e]] = n = n[s[e]] || {};
				return n
			},
			h = l("com.greensock"),
			_ = 1e-10,
			u = function (t) {
				var e, i = [],
					s = t.length;
				for (e = 0; e !== s; i.push(t[e++]));
				return i
			},
			m = function () {},
			f = function () {
				var t = Object.prototype.toString,
					e = t.call([]);
				return function (i) {
					return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e)
				}
			}(),
			c = {},
			p = function (s, n, r, a) {
				this.sc = c[s] ? c[s].sc : [], c[s] = this, this.gsClass = null, this.func = r;
				var o = [];
				this.check = function (h) {
					for (var _, u, m, f, d = n.length, v = d; --d > -1;)(_ = c[n[d]] || new p(n[d], [])).gsClass ? (o[d] = _.gsClass, v--) : h && _.sc.push(this);
					if (0 === v && r)
						for (u = ("com.greensock." + s).split("."), m = u.pop(), f = l(u.join("."))[m] = this.gsClass = r.apply(r, o), a && (i[m] = f, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function () {
								return f
							}) : s === e && "undefined" != typeof module && module.exports && (module.exports = f)), d = 0; this.sc.length > d; d++) this.sc[d].check()
				}, this.check(!0)
			},
			d = t._gsDefine = function (t, e, i, s) {
				return new p(t, e, i, s)
			},
			v = h._class = function (t, e, i) {
				return e = e || function () {}, d(t, [], function () {
					return e
				}, i), e
			};
		d.globals = i;
		var g = [0, 0, 1, 1],
			T = [],
			y = v("easing.Ease", function (t, e, i, s) {
				this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g
			}, !0),
			w = y.map = {},
			P = y.register = function (t, e, i, s) {
				for (var n, r, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
					for (r = l[_], n = s ? v("easing." + r, null, !0) : h.easing[r] || {}, a = u.length; --a > -1;) o = u[a], w[r + "." + o] = w[o + r] = n[o] = t.getRatio ? t : t[o] || new t
			};
		for (r = y.prototype, r._calcEnd = !1, r.getRatio = function (t) {
				if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
				var e = this._type,
					i = this._power,
					s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
				return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
			}, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = s.length; --n > -1;) r = s[n] + ",Power" + n, P(new y(null, null, 1, n), r, "easeOut", !0), P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), P(new y(null, null, 3, n), r, "easeInOut");
		w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
		var b = v("events.EventDispatcher", function (t) {
			this._listeners = {}, this._eventTarget = t || this
		});
		r = b.prototype, r.addEventListener = function (t, e, i, s, n) {
			n = n || 0;
			var r, l, h = this._listeners[t],
				_ = 0;
			for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) r = h[l], r.c === e && r.s === i ? h.splice(l, 1) : 0 === _ && n > r.pr && (_ = l + 1);
			h.splice(_, 0, {
				c: e,
				s: i,
				up: s,
				pr: n
			}), this !== a || o || a.wake()
		}, r.removeEventListener = function (t, e) {
			var i, s = this._listeners[t];
			if (s)
				for (i = s.length; --i > -1;)
					if (s[i].c === e) return s.splice(i, 1), void 0
		}, r.dispatchEvent = function (t) {
			var e, i, s, n = this._listeners[t];
			if (n)
				for (e = n.length, i = this._eventTarget; --e > -1;) s = n[e], s && (s.up ? s.c.call(s.s || i, {
					type: t,
					target: i
				}) : s.c.call(s.s || i))
		};
		var k = t.requestAnimationFrame,
			A = t.cancelAnimationFrame,
			S = Date.now || function () {
				return (new Date).getTime()
			},
			x = S();
		for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k;) k = t[s[n] + "RequestAnimationFrame"], A = t[s[n] + "CancelAnimationFrame"] || t[s[n] + "CancelRequestAnimationFrame"];
		v("Ticker", function (t, e) {
			var i, s, n, r, l, h = this,
				u = S(),
				f = e !== !1 && k,
				c = 500,
				p = 33,
				d = "tick",
				v = function (t) {
					var e, a, o = S() - x;
					o > c && (u += o - p), x += o, h.time = (x - u) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= r ? .004 : r - e), a = !0), t !== !0 && (n = s(v)), a && h.dispatchEvent(d)
				};
			b.call(h), h.time = h.frame = 0, h.tick = function () {
				v(!0)
			}, h.lagSmoothing = function (t, e) {
				c = t || 1 / _, p = Math.min(e, c, 0)
			}, h.sleep = function () {
				null != n && (f && A ? A(n) : clearTimeout(n), s = m, n = null, h === a && (o = !1))
			}, h.wake = function () {
				null !== n ? h.sleep() : h.frame > 10 && (x = S() - c + 5), s = 0 === i ? m : f && k ? k : function (t) {
					return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
				}, h === a && (o = !0), v(2)
			}, h.fps = function (t) {
				return arguments.length ? (i = t, r = 1 / (i || 60), l = this.time + r, h.wake(), void 0) : i
			}, h.useRAF = function (t) {
				return arguments.length ? (h.sleep(), f = t, h.fps(i), void 0) : f
			}, h.fps(t), setTimeout(function () {
				f && 5 > h.frame && h.useRAF(!1)
			}, 1500)
		}), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
		var R = v("core.Animation", function (t, e) {
			if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
				o || a.wake();
				var i = this.vars.useFrames ? q : B;
				i.add(this, i._time), this.vars.paused && this.paused(!0)
			}
		});
		a = R.ticker = new h.Ticker, r = R.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
		var C = function () {
			o && S() - x > 2e3 && a.wake(), setTimeout(C, 2e3)
		};
		C(), r.play = function (t, e) {
			return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
		}, r.pause = function (t, e) {
			return null != t && this.seek(t, e), this.paused(!0)
		}, r.resume = function (t, e) {
			return null != t && this.seek(t, e), this.paused(!1)
		}, r.seek = function (t, e) {
			return this.totalTime(Number(t), e !== !1)
		}, r.restart = function (t, e) {
			return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0)
		}, r.reverse = function (t, e) {
			return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
		}, r.render = function () {}, r.invalidate = function () {
			return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
		}, r.isActive = function () {
			var t, e = this._timeline,
				i = this._startTime;
			return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
		}, r._enabled = function (t, e) {
			return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
		}, r._kill = function () {
			return this._enabled(!1, !1)
		}, r.kill = function (t, e) {
			return this._kill(t, e), this
		}, r._uncache = function (t) {
			for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
			return this
		}, r._swapSelfInParams = function (t) {
			for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
			return i
		}, r._callback = function (t) {
			var e = this.vars;
			e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || T)
		}, r.eventCallback = function (t, e, i, s) {
			if ("on" === (t || "").substr(0, 2)) {
				var n = this.vars;
				if (1 === arguments.length) return n[t];
				null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = f(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
			}
			return this
		}, r.delay = function (t) {
			return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
		}, r.duration = function (t) {
			return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
		}, r.totalDuration = function (t) {
			return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
		}, r.time = function (t, e) {
			return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
		}, r.totalTime = function (t, e, i) {
			if (o || a.wake(), !arguments.length) return this._totalTime;
			if (this._timeline) {
				if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
					this._dirty && this.totalDuration();
					var s = this._totalDuration,
						n = this._timeline;
					if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)
						for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
				}
				this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), z.length && $())
			}
			return this
		}, r.progress = r.totalProgress = function (t, e) {
			return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration()
		}, r.startTime = function (t) {
			return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
		}, r.endTime = function (t) {
			return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
		}, r.timeScale = function (t) {
			if (!arguments.length) return this._timeScale;
			if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
				var e = this._pauseTime,
					i = e || 0 === e ? e : this._timeline.totalTime();
				this._startTime = i - (i - this._startTime) * this._timeScale / t
			}
			return this._timeScale = t, this._uncache(!1)
		}, r.reversed = function (t) {
			return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
		}, r.paused = function (t) {
			if (!arguments.length) return this._paused;
			var e, i, s = this._timeline;
			return t != this._paused && s && (o || t || a.wake(), e = s.rawTime(), i = e - this._pauseTime, !t && s.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && this.render(s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, !0, !0)), this._gc && !t && this._enabled(!0, !1), this
		};
		var D = v("core.SimpleTimeline", function (t) {
			R.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
		});
		r = D.prototype = new R, r.constructor = D, r.kill()._gc = !1, r._first = r._last = r._recent = null, r._sortChildren = !1, r.add = r.insert = function (t, e) {
			var i, s;
			if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
				for (s = t._startTime; i && i._startTime > s;) i = i._prev;
			return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._recent = t, this._timeline && this._uncache(!0), this
		}, r._remove = function (t, e) {
			return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
		}, r.render = function (t, e, i) {
			var s, n = this._first;
			for (this._totalTime = this._time = this._rawPrevTime = t; n;) s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s
		}, r.rawTime = function () {
			return o || a.wake(), this._totalTime
		};
		var I = v("TweenLite", function (e, i, s) {
				if (R.call(this, i, s), this.render = I.prototype.render, null == e) throw "Cannot tween a null target.";
				this.target = e = "string" != typeof e ? e : I.selector(e) || e;
				var n, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
					l = this.vars.overwrite;
				if (this._overwrite = l = null == l ? Q[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (o || e instanceof Array || e.push && f(e)) && "number" != typeof e[0])
					for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++) r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(u(r))) : (this._siblings[n] = K(r, this, !1), 1 === l && this._siblings[n].length > 1 && J(r, this, null, 1, this._siblings[n])) : (r = a[n--] = I.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1);
				else this._propLookup = {}, this._siblings = K(e, this, !1), 1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
				(this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
			}, !0),
			E = function (e) {
				return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
			},
			O = function (t, e) {
				var i, s = {};
				for (i in t) G[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!F[i] || F[i] && F[i]._autoCSS) || (s[i] = t[i], delete t[i]);
				t.css = s
			};
		r = I.prototype = new R, r.constructor = I, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, I.version = "1.17.0", I.defaultEase = r._ease = new y(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = a, I.autoSleep = 120, I.lagSmoothing = function (t, e) {
			a.lagSmoothing(t, e)
		}, I.selector = t.$ || t.jQuery || function (e) {
			var i = t.$ || t.jQuery;
			return i ? (I.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
		};
		var z = [],
			N = {},
			L = I._internals = {
				isArray: f,
				isSelector: E,
				lazyTweens: z
			},
			F = I._plugins = {},
			U = L.tweenLookup = {},
			j = 0,
			G = L.reservedProps = {
				ease: 1,
				delay: 1,
				overwrite: 1,
				onComplete: 1,
				onCompleteParams: 1,
				onCompleteScope: 1,
				useFrames: 1,
				runBackwards: 1,
				startAt: 1,
				onUpdate: 1,
				onUpdateParams: 1,
				onUpdateScope: 1,
				onStart: 1,
				onStartParams: 1,
				onStartScope: 1,
				onReverseComplete: 1,
				onReverseCompleteParams: 1,
				onReverseCompleteScope: 1,
				onRepeat: 1,
				onRepeatParams: 1,
				onRepeatScope: 1,
				easeParams: 1,
				yoyo: 1,
				immediateRender: 1,
				repeat: 1,
				repeatDelay: 1,
				data: 1,
				paused: 1,
				reversed: 1,
				autoCSS: 1,
				lazy: 1,
				onOverwrite: 1,
				callbackScope: 1
			},
			Q = {
				none: 0,
				all: 1,
				auto: 2,
				concurrent: 3,
				allOnStart: 4,
				preexisting: 5,
				"true": 1,
				"false": 0
			},
			q = R._rootFramesTimeline = new D,
			B = R._rootTimeline = new D,
			M = 30,
			$ = L.lazyRender = function () {
				var t, e = z.length;
				for (N = {}; --e > -1;) t = z[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
				z.length = 0
			};
		B._startTime = a.time, q._startTime = a.frame, B._active = q._active = !0, setTimeout($, 1), R._updateRoot = I.render = function () {
			var t, e, i;
			if (z.length && $(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), z.length && $(), a.frame >= M) {
				M = a.frame + (parseInt(I.autoSleep, 10) || 120);
				for (i in U) {
					for (e = U[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
					0 === e.length && delete U[i]
				}
				if (i = B._first, (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length) {
					for (; i && i._paused;) i = i._next;
					i || a.sleep()
				}
			}
		}, a.addEventListener("tick", R._updateRoot);
		var K = function (t, e, i) {
				var s, n, r = t._gsTweenID;
				if (U[r || (t._gsTweenID = r = "t" + j++)] || (U[r] = {
						target: t,
						tweens: []
					}), e && (s = U[r].tweens, s[n = s.length] = e, i))
					for (; --n > -1;) s[n] === e && s.splice(n, 1);
				return U[r].tweens
			},
			H = function (t, e, i, s) {
				var n, r, a = t.vars.onOverwrite;
				return a && (n = a(t, e, i, s)), a = I.onOverwrite, a && (r = a(t, e, i, s)), n !== !1 && r !== !1
			},
			J = function (t, e, i, s, n) {
				var r, a, o, l;
				if (1 === s || s >= 4) {
					for (l = n.length, r = 0; l > r; r++)
						if ((o = n[r]) !== e) o._gc || o._kill(null, t, e) && (a = !0);
						else if (5 === s) break;
					return a
				}
				var h, u = e._startTime + _,
					m = [],
					f = 0,
					c = 0 === e._duration;
				for (r = n.length; --r > -1;)(o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || V(e, 0, c), 0 === V(o, h, c) && (m[f++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((c || !o._initted) && 2e-10 >= u - o._startTime || (m[f++] = o)));
				for (r = f; --r > -1;)
					if (o = m[r], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
						if (2 !== s && !H(o, e)) continue;
						o._enabled(!1, !1) && (a = !0)
					} return a
			},
			V = function (t, e, i) {
				for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
					if (r += s._startTime, n *= s._timeScale, s._paused) return -100;
					s = s._timeline
				}
				return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * _ > r - e ? _ : (r += t.totalDuration() / t._timeScale / n) > e + _ ? 0 : r - e - _
			};
		r._init = function () {
			var t, e, i, s, n, r = this.vars,
				a = this._overwrittenProps,
				o = this._duration,
				l = !!r.immediateRender,
				h = r.ease;
			if (r.startAt) {
				this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
				for (s in r.startAt) n[s] = r.startAt[s];
				if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = I.to(this.target, 0, n), l)
					if (this._time > 0) this._startAt = null;
					else if (0 !== o) return
			} else if (r.runBackwards && 0 !== o)
				if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
				else {
					0 !== this._time && (l = !1), i = {};
					for (s in r) G[s] && "autoCSS" !== s || (i[s] = r[s]);
					if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = I.to(this.target, 0, i), l) {
						if (0 === this._time) return
					} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
				} if (this._ease = h = h ? h instanceof y ? h : "function" == typeof h ? new y(h, r.easeParams) : w[h] || I.defaultEase : I.defaultEase, r.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, r.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
				for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
			else e = this._initProps(this.target, this._propLookup, this._siblings, a);
			if (e && I._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
				for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
			this._onUpdate = r.onUpdate, this._initted = !0
		}, r._initProps = function (e, i, s, n) {
			var r, a, o, l, h, _;
			if (null == e) return !1;
			N[e._gsTweenID] && $(), this.vars.css || e.style && e !== t && e.nodeType && F.css && this.vars.autoCSS !== !1 && O(this.vars, e);
			for (r in this.vars) {
				if (_ = this.vars[r], G[r]) _ && (_ instanceof Array || _.push && f(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this));
				else if (F[r] && (l = new F[r])._onInitTween(e, this.vars[r], this)) {
					for (this._firstPT = h = {
							_next: this._firstPT,
							t: l,
							p: "setRatio",
							s: 0,
							c: 1,
							f: !0,
							n: r,
							pg: !0,
							pr: l._priority
						}, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
					(l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
				} else this._firstPT = i[r] = h = {
					_next: this._firstPT,
					t: e,
					p: r,
					f: "function" == typeof e[r],
					n: r,
					pg: !1,
					pr: 0
				}, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;
				h && h._next && (h._next._prev = h)
			}
			return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && J(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (N[e._gsTweenID] = !0), o)
		}, r.render = function (t, e, i) {
			var s, n, r, a, o = this._time,
				l = this._duration,
				h = this._rawPrevTime;
			if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === _ && "isPause" !== this.data) && h !== t && (i = !0, h > _ && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : _);
			else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0) && (n = "onReverseComplete", s = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== _ || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : _)), this._initted || (i = !0);
			else if (this._totalTime = this._time = t, this._easeType) {
				var u = t / l,
					m = this._easeType,
					f = this._easePower;
				(1 === m || 3 === m && u >= .5) && (u = 1 - u), 3 === m && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === m ? 1 - u : 2 === m ? u : .5 > t / l ? u / 2 : 1 - u / 2
			} else this.ratio = this._ease.getRatio(t / l);
			if (this._time !== o || i) {
				if (!this._initted) {
					if (this._init(), !this._initted || this._gc) return;
					if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, z.push(this), this._lazy = [t, e], void 0;
					this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
				}
				for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), r = this._firstPT; r;) r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
				this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._callback("onUpdate")), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this._callback(n), 0 === l && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
			}
		}, r._kill = function (t, e, i) {
			if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
			e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
			var s, n, r, a, o, l, h, _, u, m = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
			if ((f(e) || E(e)) && "number" != typeof e[0])
				for (s = e.length; --s > -1;) this._kill(t, e[s], i) && (l = !0);
			else {
				if (this._targets) {
					for (s = this._targets.length; --s > -1;)
						if (e === this._targets[s]) {
							o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
							break
						}
				} else {
					if (e !== this.target) return !1;
					o = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
				}
				if (o) {
					if (h = t || o, _ = t !== n && "all" !== n && t !== o && ("object" != typeof t || !t._tempKill), i && (I.onOverwrite || this.vars.onOverwrite)) {
						for (r in h) o[r] && (u || (u = []), u.push(r));
						if ((u || !t) && !H(this, i, e, u)) return !1
					}
					for (r in h)(a = o[r]) && (m && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[r]), _ && (n[r] = 1);
					!this._firstPT && this._initted && this._enabled(!1, !1)
				}
			}
			return l
		}, r.invalidate = function () {
			return this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], R.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -_, this.render(-this._delay)), this
		}, r._enabled = function (t, e) {
			if (o || a.wake(), t && this._gc) {
				var i, s = this._targets;
				if (s)
					for (i = s.length; --i > -1;) this._siblings[i] = K(s[i], this, !0);
				else this._siblings = K(this.target, this, !0)
			}
			return R.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
		}, I.to = function (t, e, i) {
			return new I(t, e, i)
		}, I.from = function (t, e, i) {
			return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i)
		}, I.fromTo = function (t, e, i, s) {
			return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new I(t, e, s)
		}, I.delayedCall = function (t, e, i, s, n) {
			return new I(e, 0, {
				delay: t,
				onComplete: e,
				onCompleteParams: i,
				callbackScope: s,
				onReverseComplete: e,
				onReverseCompleteParams: i,
				immediateRender: !1,
				lazy: !1,
				useFrames: n,
				overwrite: 0
			})
		}, I.set = function (t, e) {
			return new I(t, 0, e)
		}, I.getTweensOf = function (t, e) {
			if (null == t) return [];
			t = "string" != typeof t ? t : I.selector(t) || t;
			var i, s, n, r;
			if ((f(t) || E(t)) && "number" != typeof t[0]) {
				for (i = t.length, s = []; --i > -1;) s = s.concat(I.getTweensOf(t[i], e));
				for (i = s.length; --i > -1;)
					for (r = s[i], n = i; --n > -1;) r === s[n] && s.splice(i, 1)
			} else
				for (s = K(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
			return s
		}, I.killTweensOf = I.killDelayedCallsTo = function (t, e, i) {
			"object" == typeof e && (i = e, e = !1);
			for (var s = I.getTweensOf(t, e), n = s.length; --n > -1;) s[n]._kill(i, t)
		};
		var W = v("plugins.TweenPlugin", function (t, e) {
			this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = W.prototype
		}, !0);
		if (r = W.prototype, W.version = "1.10.1", W.API = 2, r._firstPT = null, r._addTween = function (t, e, i, s, n, r) {
				var a, o;
				return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - Number(i) : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = {
					_next: this._firstPT,
					t: t,
					p: e,
					s: i,
					c: a,
					f: "function" == typeof t[e],
					n: n || e,
					r: r
				}, o._next && (o._next._prev = o), o) : void 0
			}, r.setRatio = function (t) {
				for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next
			}, r._kill = function (t) {
				var e, i = this._overwriteProps,
					s = this._firstPT;
				if (null != t[this._propName]) this._overwriteProps = [];
				else
					for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
				for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
				return !1
			}, r._roundProps = function (t, e) {
				for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
			}, I._onPluginEvent = function (t, e) {
				var i, s, n, r, a, o = e._firstPT;
				if ("_onInitAllProps" === t) {
					for (; o;) {
						for (a = o._next, s = n; s && s.pr > o.pr;) s = s._next;
						(o._prev = s ? s._prev : r) ? o._prev._next = o: n = o, (o._next = s) ? s._prev = o : r = o, o = a
					}
					o = e._firstPT = n
				}
				for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
				return i
			}, W.activate = function (t) {
				for (var e = t.length; --e > -1;) t[e].API === W.API && (F[(new t[e])._propName] = t[e]);
				return !0
			}, d.plugin = function (t) {
				if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
				var e, i = t.propName,
					s = t.priority || 0,
					n = t.overwriteProps,
					r = {
						init: "_onInitTween",
						set: "setRatio",
						kill: "_kill",
						round: "_roundProps",
						initAll: "_onInitAllProps"
					},
					a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
						W.call(this, i, s), this._overwriteProps = n || []
					}, t.global === !0),
					o = a.prototype = new W(i);
				o.constructor = a, a.API = t.API;
				for (e in r) "function" == typeof t[e] && (o[r[e]] = t[e]);
				return a.version = t.version, W.activate([a]), a
			}, s = t._gsQueue) {
			for (n = 0; s.length > n; n++) s[n]();
			for (r in c) c[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r)
		}
		o = !1
	}
})("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");

/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
		"use strict";
		_gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
			var s = function (t) {
					e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
					var i, s, r = this.vars;
					for (s in r) i = r[s], h(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
					h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
				},
				r = 1e-10,
				n = i._internals,
				a = s._internals = {},
				o = n.isSelector,
				h = n.isArray,
				l = n.lazyTweens,
				_ = n.lazyRender,
				u = [],
				f = _gsScope._gsDefine.globals,
				c = function (t) {
					var e, i = {};
					for (e in t) i[e] = t[e];
					return i
				},
				p = a.pauseCallback = function (t, e, i, s) {
					var n, a = t._timeline,
						o = a._totalTime,
						h = t._startTime,
						l = 0 > t._rawPrevTime || 0 === t._rawPrevTime && a._reversed,
						_ = l ? 0 : r,
						f = l ? r : 0;
					if (e || !this._forcingPlayhead) {
						for (a.pause(h), n = t._prev; n && n._startTime === h;) n._rawPrevTime = f, n = n._prev;
						for (n = t._next; n && n._startTime === h;) n._rawPrevTime = _, n = n._next;
						e && e.apply(s || a.vars.callbackScope || a, i || u), (this._forcingPlayhead || !a._paused) && a.seek(o)
					}
				},
				m = function (t) {
					var e, i = [],
						s = t.length;
					for (e = 0; e !== s; i.push(t[e++]));
					return i
				},
				d = s.prototype = new e;
			return s.version = "1.17.0", d.constructor = s, d.kill()._gc = d._forcingPlayhead = !1, d.to = function (t, e, s, r) {
				var n = s.repeat && f.TweenMax || i;
				return e ? this.add(new n(t, e, s), r) : this.set(t, s, r)
			}, d.from = function (t, e, s, r) {
				return this.add((s.repeat && f.TweenMax || i).from(t, e, s), r)
			}, d.fromTo = function (t, e, s, r, n) {
				var a = r.repeat && f.TweenMax || i;
				return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n)
			}, d.staggerTo = function (t, e, r, n, a, h, l, _) {
				var u, f = new s({
					onComplete: h,
					onCompleteParams: l,
					callbackScope: _,
					smoothChildTiming: this.smoothChildTiming
				});
				for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], o(t) && (t = m(t)), n = n || 0, 0 > n && (t = m(t), t.reverse(), n *= -1), u = 0; t.length > u; u++) r.startAt && (r.startAt = c(r.startAt)), f.to(t[u], e, c(r), u * n);
				return this.add(f, a)
			}, d.staggerFrom = function (t, e, i, s, r, n, a, o) {
				return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
			}, d.staggerFromTo = function (t, e, i, s, r, n, a, o, h) {
				return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h)
			}, d.call = function (t, e, s, r) {
				return this.add(i.delayedCall(0, t, e, s), r)
			}, d.set = function (t, e, s) {
				return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s)
			}, s.exportRoot = function (t, e) {
				t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
				var r, n, a = new s(t),
					o = a._timeline;
				for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
				return o.add(a, 0), a
			}, d.add = function (r, n, a, o) {
				var l, _, u, f, c, p;
				if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
					if (r instanceof Array || r && r.push && h(r)) {
						for (a = a || "normal", o = o || 0, l = n, _ = r.length, u = 0; _ > u; u++) h(f = r[u]) && (f = new s({
							tweens: f
						})), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === a ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === a && (f._startTime -= f.delay())), l += o;
						return this._uncache(!0)
					}
					if ("string" == typeof r) return this.addLabel(r, n);
					if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
					r = i.delayedCall(0, r)
				}
				if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
					for (c = this, p = c.rawTime() > r._startTime; c._timeline;) p && c._timeline.smoothChildTiming ? c.totalTime(c._totalTime, !0) : c._gc && c._enabled(!0, !1), c = c._timeline;
				return this
			}, d.remove = function (e) {
				if (e instanceof t) return this._remove(e, !1);
				if (e instanceof Array || e && e.push && h(e)) {
					for (var i = e.length; --i > -1;) this.remove(e[i]);
					return this
				}
				return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
			}, d._remove = function (t, i) {
				e.prototype._remove.call(this, t, i);
				var s = this._last;
				return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
			}, d.append = function (t, e) {
				return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
			}, d.insert = d.insertMultiple = function (t, e, i, s) {
				return this.add(t, e || 0, i, s)
			}, d.appendMultiple = function (t, e, i, s) {
				return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
			}, d.addLabel = function (t, e) {
				return this._labels[t] = this._parseTimeOrLabel(e), this
			}, d.addPause = function (t, e, s, r) {
				var n = i.delayedCall(0, p, ["{self}", e, s, r], this);
				return n.data = "isPause", this.add(n, t)
			}, d.removeLabel = function (t) {
				return delete this._labels[t], this
			}, d.getLabelTime = function (t) {
				return null != this._labels[t] ? this._labels[t] : -1
			}, d._parseTimeOrLabel = function (e, i, s, r) {
				var n;
				if (r instanceof t && r.timeline === this) this.remove(r);
				else if (r && (r instanceof Array || r.push && h(r)))
					for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
				if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
				if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
				else {
					if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
					i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
				}
				return Number(e) + i
			}, d.seek = function (t, e) {
				return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1)
			}, d.stop = function () {
				return this.paused(!0)
			}, d.gotoAndPlay = function (t, e) {
				return this.play(t, e)
			}, d.gotoAndStop = function (t, e) {
				return this.pause(t, e)
			}, d.render = function (t, e, i) {
				this._gc && this._enabled(!0, !1);
				var s, n, a, o, h, u = this._dirty ? this.totalDuration() : this._totalDuration,
					f = this._time,
					c = this._startTime,
					p = this._timeScale,
					m = this._paused;
				if (t >= u) this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", h = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (h = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = u + 1e-4;
				else if (1e-7 > t)
					if (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (h = n = !0, o = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (h = !0), this._rawPrevTime = t;
					else {
						if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 0 === t && n)
							for (s = this._first; s && 0 === s._startTime;) s._duration || (n = !1), s = s._next;
						t = 0, this._initted || (h = !0)
					}
				else this._totalTime = this._time = this._rawPrevTime = t;
				if (this._time !== f && this._first || i || h) {
					if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= f)
						for (s = this._first; s && (a = s._next, !this._paused || m);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
					else
						for (s = this._last; s && (a = s._prev, !this._paused || m);)(s._active || f >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
					this._onUpdate && (e || (l.length && _(), this._callback("onUpdate"))), o && (this._gc || (c === this._startTime || p !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (n && (l.length && _(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this._callback(o)))
				}
			}, d._hasPausedChild = function () {
				for (var t = this._first; t;) {
					if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
					t = t._next
				}
				return !1
			}, d.getChildren = function (t, e, s, r) {
				r = r || -9999999999;
				for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next;
				return n
			}, d.getTweensOf = function (t, e) {
				var s, r, n = this._gc,
					a = [],
					o = 0;
				for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
				return n && this._enabled(!1, !0), a
			}, d.recent = function () {
				return this._recent
			}, d._contains = function (t) {
				for (var e = t.timeline; e;) {
					if (e === this) return !0;
					e = e.timeline
				}
				return !1
			}, d.shiftChildren = function (t, e, i) {
				i = i || 0;
				for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
				if (e)
					for (s in n) n[s] >= i && (n[s] += t);
				return this._uncache(!0)
			}, d._kill = function (t, e) {
				if (!t && !e) return this._enabled(!1, !1);
				for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0);
				return r
			}, d.clear = function (t) {
				var e = this.getChildren(!1, !0, !0),
					i = e.length;
				for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
				return t !== !1 && (this._labels = {}), this._uncache(!0)
			}, d.invalidate = function () {
				for (var e = this._first; e;) e.invalidate(), e = e._next;
				return t.prototype.invalidate.call(this)
			}, d._enabled = function (t, i) {
				if (t === this._gc)
					for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
				return e.prototype._enabled.call(this, t, i)
			}, d.totalTime = function () {
				this._forcingPlayhead = !0;
				var e = t.prototype.totalTime.apply(this, arguments);
				return this._forcingPlayhead = !1, e
			}, d.duration = function (t) {
				return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
			}, d.totalDuration = function (t) {
				if (!arguments.length) {
					if (this._dirty) {
						for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
						this._duration = this._totalDuration = s, this._dirty = !1
					}
					return this._totalDuration
				}
				return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
			}, d.paused = function (e) {
				if (!e)
					for (var i = this._first, s = this._time; i;) i._startTime === s && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
				return t.prototype.paused.apply(this, arguments)
			}, d.usesFrames = function () {
				for (var e = this._timeline; e._timeline;) e = e._timeline;
				return e === t._rootFramesTimeline
			}, d.rawTime = function () {
				return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
			}, s
		}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function (t) {
		"use strict";
		var e = function () {
			return (_gsScope.GreenSockGlobals || _gsScope)[t]
		};
		"function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("TweenLite.html"), module.exports = e())
	}("TimelineLite");


/*!
 * VERSION: beta 1.15.2
 * DATE: 2015-01-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
	"use strict";
	_gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
		var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope,
			n = r.com.greensock,
			a = 2 * Math.PI,
			o = Math.PI / 2,
			h = n._class,
			l = function (e, i) {
				var s = h("easing." + e, function () {}, !0),
					r = s.prototype = new t;
				return r.constructor = s, r.getRatio = i, s
			},
			_ = t.register || function () {},
			u = function (t, e, i, s) {
				var r = h("easing." + t, {
					easeOut: new e,
					easeIn: new i,
					easeInOut: new s
				}, !0);
				return _(r, t), r
			},
			c = function (t, e, i) {
				this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
			},
			f = function (e, i) {
				var s = h("easing." + e, function (t) {
						this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
					}, !0),
					r = s.prototype = new t;
				return r.constructor = s, r.getRatio = i, r.config = function (t) {
					return new s(t)
				}, s
			},
			p = u("Back", f("BackOut", function (t) {
				return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
			}), f("BackIn", function (t) {
				return t * t * ((this._p1 + 1) * t - this._p1)
			}), f("BackInOut", function (t) {
				return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
			})),
			m = h("easing.SlowMo", function (t, e, i) {
				e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0
			}, !0),
			d = m.prototype = new t;
		return d.constructor = m, d.getRatio = function (t) {
			var e = t + (.5 - t) * this._p;
			return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
		}, m.ease = new m(.7, .7), d.config = m.config = function (t, e, i) {
			return new m(t, e, i)
		}, e = h("easing.SteppedEase", function (t) {
			t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
		}, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function (t) {
			return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
		}, d.config = e.config = function (t) {
			return new e(t)
		}, i = h("easing.RoughEase", function (e) {
			e = e || {};
			for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), f = u, p = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / u * f, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), p ? s += Math.random() * r - .5 * r : f % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = {
				x: i,
				y: s
			};
			for (l.sort(function (t, e) {
					return t.x - e.x
				}), o = new c(1, 1, null), f = u; --f > -1;) a = l[f], o = new c(a.x, a.y, o);
			this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
		}, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function (t) {
			var e = this._prev;
			if (t > e.t) {
				for (; e.next && t >= e.t;) e = e.next;
				e = e.prev
			} else
				for (; e.prev && e.t >= t;) e = e.prev;
			return this._prev = e, e.v + (t - e.t) / e.gap * e.c
		}, d.config = function (t) {
			return new i(t)
		}, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
			return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
		}), l("BounceIn", function (t) {
			return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
		}), l("BounceInOut", function (t) {
			var e = .5 > t;
			return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
		})), u("Circ", l("CircOut", function (t) {
			return Math.sqrt(1 - (t -= 1) * t)
		}), l("CircIn", function (t) {
			return -(Math.sqrt(1 - t * t) - 1)
		}), l("CircInOut", function (t) {
			return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
		})), s = function (e, i, s) {
			var r = h("easing." + e, function (t, e) {
					this._p1 = t >= 1 ? t : 1, this._p2 = (e || s) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
				}, !0),
				n = r.prototype = new t;
			return n.constructor = r, n.getRatio = i, n.config = function (t, e) {
				return new r(t, e)
			}, r
		}, u("Elastic", s("ElasticOut", function (t) {
			return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
		}, .3), s("ElasticIn", function (t) {
			return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2))
		}, .3), s("ElasticInOut", function (t) {
			return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) + 1
		}, .45)), u("Expo", l("ExpoOut", function (t) {
			return 1 - Math.pow(2, -10 * t)
		}), l("ExpoIn", function (t) {
			return Math.pow(2, 10 * (t - 1)) - .001
		}), l("ExpoInOut", function (t) {
			return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
		})), u("Sine", l("SineOut", function (t) {
			return Math.sin(t * o)
		}), l("SineIn", function (t) {
			return -Math.cos(t * o) + 1
		}), l("SineInOut", function (t) {
			return -.5 * (Math.cos(Math.PI * t) - 1)
		})), h("easing.EaseLookup", {
			find: function (e) {
				return t.map[e]
			}
		}, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), p
	}, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();


/*!
 * VERSION: 1.17.0
 * DATE: 2015-05-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
		"use strict";
		_gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
			var i, r, s, n, a = function () {
					t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
				},
				o = _gsScope._gsDefine.globals,
				l = {},
				h = a.prototype = new t("css");
			h.constructor = a, a.version = "1.17.0", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, h = "px", a.suffixMap = {
				top: h,
				right: h,
				bottom: h,
				left: h,
				width: h,
				height: h,
				fontSize: h,
				padding: h,
				margin: h,
				perspective: h,
				lineHeight: ""
			};
			var u, f, c, p, _, d, m = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
				g = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
				v = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
				y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
				x = /(?:\d|\-|\+|=|#|\.)*/g,
				T = /opacity *= *([^)]*)/i,
				w = /opacity:([^;]*)/i,
				b = /alpha\(opacity *=.+?\)/i,
				P = /^(rgb|hsl)/,
				S = /([A-Z])/g,
				O = /-([a-z])/gi,
				k = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
				C = function (t, e) {
					return e.toUpperCase()
				},
				R = /(?:Left|Right|Width)/i,
				A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
				M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
				D = /,(?=[^\)]*(?:\(|$))/gi,
				N = Math.PI / 180,
				L = 180 / Math.PI,
				F = {},
				X = document,
				z = function (t) {
					return X.createElementNS ? X.createElementNS("http://www.w3.org/1999/xhtml", t) : X.createElement(t)
				},
				B = z("div"),
				E = z("img"),
				I = a._internals = {
					_specialProps: l
				},
				Y = navigator.userAgent,
				W = function () {
					var t = Y.indexOf("Android"),
						e = z("a");
					return c = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3), _ = c && 6 > Number(Y.substr(Y.indexOf("Version/index.html") + 8, 1)), p = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (d = parseFloat(RegExp.$1)), e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1
				}(),
				V = function (t) {
					return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
				},
				j = function (t) {
					window.console && console.log(t)
				},
				G = "",
				U = "",
				q = function (t, e) {
					e = e || B;
					var i, r, s = e.style;
					if (void 0 !== s[t]) return t;
					for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === s[i[r] + t];);
					return r >= 0 ? (U = 3 === r ? "ms" : i[r], G = "-" + U.toLowerCase() + "-", U + t) : null
				},
				H = X.defaultView ? X.defaultView.getComputedStyle : function () {},
				Q = a.getStyle = function (t, e, i, r, s) {
					var n;
					return W || "opacity" !== e ? (!r && t.style[e] ? n = t.style[e] : (i = i || H(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == s || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : s) : V(t)
				},
				Z = I.convertToPixels = function (t, i, r, s, n) {
					if ("px" === s || !s) return r;
					if ("auto" === s || !r) return 0;
					var o, l, h, u = R.test(i),
						f = t,
						c = B.style,
						p = 0 > r;
					if (p && (r = -r), "%" === s && -1 !== i.indexOf("border")) o = r / 100 * (u ? t.clientWidth : t.clientHeight);
					else {
						if (c.cssText = "border:0 solid red;position:" + Q(t, "position") + ";line-height:0;", "%" !== s && f.appendChild) c[u ? "borderLeftWidth" : "borderTopWidth"] = r + s;
						else {
							if (f = t.parentNode || X.body, l = f._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * r / 100;
							c[u ? "width" : "height"] = r + s
						}
						f.appendChild(B), o = parseFloat(B[u ? "offsetWidth" : "offsetHeight"]), f.removeChild(B), u && "%" === s && a.cacheWidths !== !1 && (l = f._gsCache = f._gsCache || {}, l.time = h, l.width = 100 * (o / r)), 0 !== o || n || (o = Z(t, i, r, s, !0))
					}
					return p ? -o : o
				},
				$ = I.calculateOffset = function (t, e, i) {
					if ("absolute" !== Q(t, "position", i)) return 0;
					var r = "left" === e ? "Left" : "Top",
						s = Q(t, "margin" + r, i);
					return t["offset" + r] - (Z(t, e, parseFloat(s), s.replace(x, "")) || 0)
				},
				K = function (t, e) {
					var i, r, s, n = {};
					if (e = e || H(t, null))
						if (i = e.length)
							for (; --i > -1;) s = e[i], (-1 === s.indexOf("-transform") || Pe === s) && (n[s.replace(O, C)] = e.getPropertyValue(s));
						else
							for (i in e)(-1 === i.indexOf("Transform") || be === i) && (n[i] = e[i]);
					else if (e = t.currentStyle || t.style)
						for (i in e) "string" == typeof i && void 0 === n[i] && (n[i.replace(O, C)] = e[i]);
					return W || (n.opacity = V(t)), r = Xe(t, e, !1), n.rotation = r.rotation, n.skewX = r.skewX, n.scaleX = r.scaleX, n.scaleY = r.scaleY, n.x = r.x, n.y = r.y, Oe && (n.z = r.z, n.rotationX = r.rotationX, n.rotationY = r.rotationY, n.scaleZ = r.scaleZ), n.filters && delete n.filters, n
				},
				J = function (t, e, i, r, s) {
					var n, a, o, l = {},
						h = t.style;
					for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || s && s[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(y, "") ? n : 0 : $(t, a), void 0 !== h[a] && (o = new pe(h, a, h[a], o)));
					if (r)
						for (a in r) "className" !== a && (l[a] = r[a]);
					return {
						difs: l,
						firstMPT: o
					}
				},
				te = {
					width: ["Left", "Right"],
					height: ["Top", "Bottom"]
				},
				ee = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
				ie = function (t, e, i) {
					var r = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
						s = te[e],
						n = s.length;
					for (i = i || H(t, null); --n > -1;) r -= parseFloat(Q(t, "padding" + s[n], i, !0)) || 0, r -= parseFloat(Q(t, "border" + s[n] + "Width", i, !0)) || 0;
					return r
				},
				re = function (t, e) {
					(null == t || "" === t || "auto" === t || "auto auto" === t) && (t = "0 0");
					var i = t.split(" "),
						r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : i[0],
						s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : i[1];
					return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + s + (i.length > 2 ? " " + i[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(y, "")), e.oy = parseFloat(s.replace(y, "")), e.v = t), e || t
				},
				se = function (t, e) {
					return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
				},
				ne = function (t, e) {
					return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
				},
				ae = function (t, e, i, r) {
					var s, n, a, o, l, h = 1e-6;
					return null == t ? o = e : "number" == typeof t ? o = t : (s = 360, n = t.split("_"), l = "=" === t.charAt(1), a = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : L) - (l ? 0 : e), n.length && (r && (r[i] = e + a), -1 !== t.indexOf("short") && (a %= s, a !== a % (s / 2) && (a = 0 > a ? a + s : a - s)), -1 !== t.indexOf("_cw") && 0 > a ? a = (a + 9999999999 * s) % s - (0 | a / s) * s : -1 !== t.indexOf("ccw") && a > 0 && (a = (a - 9999999999 * s) % s - (0 | a / s) * s)), o = e + a), h > o && o > -h && (o = 0), o
				},
				oe = {
					aqua: [0, 255, 255],
					lime: [0, 255, 0],
					silver: [192, 192, 192],
					black: [0, 0, 0],
					maroon: [128, 0, 0],
					teal: [0, 128, 128],
					blue: [0, 0, 255],
					navy: [0, 0, 128],
					white: [255, 255, 255],
					fuchsia: [255, 0, 255],
					olive: [128, 128, 0],
					yellow: [255, 255, 0],
					orange: [255, 165, 0],
					gray: [128, 128, 128],
					purple: [128, 0, 128],
					green: [0, 128, 0],
					red: [255, 0, 0],
					pink: [255, 192, 203],
					cyan: [0, 255, 255],
					transparent: [255, 255, 255, 0]
				},
				le = function (t, e, i) {
					return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5
				},
				he = a.parseColor = function (t) {
					var e, i, r, s, n, a;
					return t && "" !== t ? "number" == typeof t ? [t >> 16, 255 & t >> 8, 255 & t] : ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), oe[t] ? oe[t] : "#" === t.charAt(0) ? (4 === t.length && (e = t.charAt(1), i = t.charAt(2), r = t.charAt(3), t = "#" + e + e + i + i + r + r), t = parseInt(t.substr(1), 16), [t >> 16, 255 & t >> 8, 255 & t]) : "hsl" === t.substr(0, 3) ? (t = t.match(m), s = Number(t[0]) % 360 / 360, n = Number(t[1]) / 100, a = Number(t[2]) / 100, i = .5 >= a ? a * (n + 1) : a + n - a * n, e = 2 * a - i, t.length > 3 && (t[3] = Number(t[3])), t[0] = le(s + 1 / 3, e, i), t[1] = le(s, e, i), t[2] = le(s - 1 / 3, e, i), t) : (t = t.match(m) || oe.transparent, t[0] = Number(t[0]), t[1] = Number(t[1]), t[2] = Number(t[2]), t.length > 3 && (t[3] = Number(t[3])), t)) : oe.black
				},
				ue = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
			for (h in oe) ue += "|" + h + "\\b";
			ue = RegExp(ue + ")", "gi");
			var fe = function (t, e, i, r) {
					if (null == t) return function (t) {
						return t
					};
					var s, n = e ? (t.match(ue) || [""])[0] : "",
						a = t.split(n).join("").match(v) || [],
						o = t.substr(0, t.indexOf(a[0])),
						l = ")" === t.charAt(t.length - 1) ? ")" : "",
						h = -1 !== t.indexOf(" ") ? " " : ",",
						u = a.length,
						f = u > 0 ? a[0].replace(m, "") : "";
					return u ? s = e ? function (t) {
						var e, c, p, _;
						if ("number" == typeof t) t += f;
						else if (r && D.test(t)) {
							for (_ = t.replace(D, "|").split("|"), p = 0; _.length > p; p++) _[p] = s(_[p]);
							return _.join(",")
						}
						if (e = (t.match(ue) || [n])[0], c = t.split(e).join("").match(v) || [], p = c.length, u > p--)
							for (; u > ++p;) c[p] = i ? c[0 | (p - 1) / 2] : a[p];
						return o + c.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
					} : function (t) {
						var e, n, c;
						if ("number" == typeof t) t += f;
						else if (r && D.test(t)) {
							for (n = t.replace(D, "|").split("|"), c = 0; n.length > c; c++) n[c] = s(n[c]);
							return n.join(",")
						}
						if (e = t.match(v) || [], c = e.length, u > c--)
							for (; u > ++c;) e[c] = i ? e[0 | (c - 1) / 2] : a[c];
						return o + e.join(h) + l
					} : function (t) {
						return t
					}
				},
				ce = function (t) {
					return t = t.split(","),
						function (e, i, r, s, n, a, o) {
							var l, h = (i + "").split(" ");
							for (o = {}, l = 0; 4 > l; l++) o[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
							return s.parse(e, o, n, a)
						}
				},
				pe = (I._setPluginRatio = function (t) {
					this.plugin.setRatio(t);
					for (var e, i, r, s, n = this.data, a = n.proxy, o = n.firstMPT, l = 1e-6; o;) e = a[o.v], o.r ? e = Math.round(e) : l > e && e > -l && (e = 0), o.t[o.p] = e, o = o._next;
					if (n.autoRotate && (n.autoRotate.rotation = a.rotation), 1 === t)
						for (o = n.firstMPT; o;) {
							if (i = o.t, i.type) {
								if (1 === i.type) {
									for (s = i.xs0 + i.s + i.xs1, r = 1; i.l > r; r++) s += i["xn" + r] + i["xs" + (r + 1)];
									i.e = s
								}
							} else i.e = i.s + i.xs0;
							o = o._next
						}
				}, function (t, e, i, r, s) {
					this.t = t, this.p = e, this.v = i, this.r = s, r && (r._prev = this, this._next = r)
				}),
				_e = (I._parseToProxy = function (t, e, i, r, s, n) {
					var a, o, l, h, u, f = r,
						c = {},
						p = {},
						_ = i._transform,
						d = F;
					for (i._transform = null, F = e, r = u = i.parse(t, e, r, s), F = d, n && (i._transform = _, f && (f._prev = null, f._prev && (f._prev._next = null))); r && r !== f;) {
						if (1 >= r.type && (o = r.p, p[o] = r.s + r.c, c[o] = r.s, n || (h = new pe(r, "s", o, h, r.r), r.c = 0), 1 === r.type))
							for (a = r.l; --a > 0;) l = "xn" + a, o = r.p + "_" + l, p[o] = r.data[l], c[o] = r[l], n || (h = new pe(r, l, o, h, r.rxp[l]));
						r = r._next
					}
					return {
						proxy: c,
						end: p,
						firstMPT: h,
						pt: u
					}
				}, I.CSSPropTween = function (t, e, r, s, a, o, l, h, u, f, c) {
					this.t = t, this.p = e, this.s = r, this.c = s, this.n = l || e, t instanceof _e || n.push(this.n), this.r = h, this.type = o || 0, u && (this.pr = u, i = !0), this.b = void 0 === f ? r : f, this.e = void 0 === c ? r + s : c, a && (this._next = a, a._prev = this)
				}),
				de = function (t, e, i, r, s, n) {
					var a = new _e(t, e, i, r - i, s, -1, n);
					return a.b = i, a.e = a.xs0 = r, a
				},
				me = a.parseComplex = function (t, e, i, r, s, n, a, o, l, h) {
					i = i || n || "", a = new _e(t, e, 0, 0, a, h ? 2 : 1, null, !1, o, i, r), r += "";
					var f, c, p, _, d, v, y, x, T, w, b, S, O = i.split(", ").join(",").split(" "),
						k = r.split(", ").join(",").split(" "),
						C = O.length,
						R = u !== !1;
					for ((-1 !== r.indexOf(",") || -1 !== i.indexOf(",")) && (O = O.join(" ").replace(D, ", ").split(" "), k = k.join(" ").replace(D, ", ").split(" "), C = O.length), C !== k.length && (O = (n || "").split(" "), C = O.length), a.plugin = l, a.setRatio = h, f = 0; C > f; f++)
						if (_ = O[f], d = k[f], x = parseFloat(_), x || 0 === x) a.appendXtra("", x, se(d, x), d.replace(g, ""), R && -1 !== d.indexOf("px"), !0);
						else if (s && ("#" === _.charAt(0) || oe[_] || P.test(_))) S = "," === d.charAt(d.length - 1) ? ")," : ")", _ = he(_), d = he(d), T = _.length + d.length > 6, T && !W && 0 === d[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[f]).join("transparent")) : (W || (T = !1), a.appendXtra(T ? "rgba(" : "rgb(", _[0], d[0] - _[0], ",", !0, !0).appendXtra("", _[1], d[1] - _[1], ",", !0).appendXtra("", _[2], d[2] - _[2], T ? "," : S, !0), T && (_ = 4 > _.length ? 1 : _[3], a.appendXtra("", _, (4 > d.length ? 1 : d[3]) - _, S, !1)));
					else if (v = _.match(m)) {
						if (y = d.match(g), !y || y.length !== v.length) return a;
						for (p = 0, c = 0; v.length > c; c++) b = v[c], w = _.indexOf(b, p), a.appendXtra(_.substr(p, w - p), Number(b), se(y[c], b), "", R && "px" === _.substr(w + b.length, 2), 0 === c), p = w + b.length;
						a["xs" + a.l] += _.substr(p)
					} else a["xs" + a.l] += a.l ? " " + _ : _;
					if (-1 !== r.indexOf("=") && a.data) {
						for (S = a.xs0 + a.data.s, f = 1; a.l > f; f++) S += a["xs" + f] + a.data["xn" + f];
						a.e = S + a["xs" + f]
					}
					return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
				},
				ge = 9;
			for (h = _e.prototype, h.l = h.pr = 0; --ge > 0;) h["xn" + ge] = 0, h["xs" + ge] = "";
			h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function (t, e, i, r, s, n) {
				var a = this,
					o = a.l;
				return a["xs" + o] += n && o ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++, a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = r || "", o > 0 ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = s, a["xn" + o] = e, a.plugin || (a.xfirst = new _e(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, s, a.pr), a.xfirst.xs0 = 0), a) : (a.data = {
					s: e + i
				}, a.rxp = {}, a.s = e, a.c = i, a.r = s, a)) : (a["xs" + o] += e + (r || ""), a)
			};
			var ve = function (t, e) {
					e = e || {}, this.p = e.prefix ? q(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || fe(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
				},
				ye = I._registerComplexSpecialProp = function (t, e, i) {
					"object" != typeof e && (e = {
						parser: i
					});
					var r, s, n = t.split(","),
						a = e.defaultValue;
					for (i = i || [a], r = 0; n.length > r; r++) e.prefix = 0 === r && e.prefix, e.defaultValue = i[r] || a, s = new ve(n[r], e)
				},
				xe = function (t) {
					if (!l[t]) {
						var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
						ye(t, {
							parser: function (t, i, r, s, n, a, h) {
								var u = o.com.greensock.plugins[e];
								return u ? (u._cssRegister(), l[r].parse(t, i, r, s, n, a, h)) : (j("Error: " + e + " js file not loaded."), n)
							}
						})
					}
				};
			h = ve.prototype, h.parseComplex = function (t, e, i, r, s, n) {
				var a, o, l, h, u, f, c = this.keyword;
				if (this.multi && (D.test(i) || D.test(e) ? (o = e.replace(D, "|").split("|"), l = i.replace(D, "|").split("|")) : c && (o = [e], l = [i])), l) {
					for (h = l.length > o.length ? l.length : o.length, a = 0; h > a; a++) e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, c && (u = e.indexOf(c), f = i.indexOf(c), u !== f && (-1 === f ? o[a] = o[a].split(c).join("") : -1 === u && (o[a] += " " + c)));
					e = o.join(", "), i = l.join(", ")
				}
				return me(t, this.p, e, i, this.clrs, this.dflt, r, this.pr, s, n)
			}, h.parse = function (t, e, i, r, n, a) {
				return this.parseComplex(t.style, this.format(Q(t, this.p, s, !1, this.dflt)), this.format(e), n, a)
			}, a.registerSpecialProp = function (t, e, i) {
				ye(t, {
					parser: function (t, r, s, n, a, o) {
						var l = new _e(t, s, 0, 0, a, 2, s, !1, i);
						return l.plugin = o, l.setRatio = e(t, r, n._tween, s), l
					},
					priority: i
				})
			}, a.useSVGTransformAttr = c || p;
			var Te, we = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
				be = q("transform"),
				Pe = G + "transform",
				Se = q("transformOrigin"),
				Oe = null !== q("perspective"),
				ke = I.Transform = function () {
					this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = a.defaultForce3D !== !1 && Oe ? a.defaultForce3D || "auto" : !1
				},
				Ce = window.SVGElement,
				Re = function (t, e, i) {
					var r, s = X.createElementNS("http://www.w3.org/2000/svg", t),
						n = /([a-z])([A-Z])/g;
					for (r in i) s.setAttributeNS(null, r.replace(n, "$1-$2").toLowerCase(), i[r]);
					return e.appendChild(s), s
				},
				Ae = X.documentElement,
				Me = function () {
					var t, e, i, r = d || /Android/i.test(Y) && !window.chrome;
					return X.createElementNS && !r && (t = Re("svg", Ae), e = Re("rect", t, {
						width: 100,
						height: 50,
						x: 100
					}), i = e.getBoundingClientRect().width, e.style[Se] = "50% 50%", e.style[be] = "scaleX(0.5)", r = i === e.getBoundingClientRect().width && !(p && Oe), Ae.removeChild(t)), r
				}(),
				De = function (t, e, i, r, s) {
					var n, o, l, h, u, f, c, p, _, d, m, g, v, y, x = t._gsTransform,
						T = Fe(t, !0);
					x && (v = x.xOrigin, y = x.yOrigin), (!r || 2 > (n = r.split(" ")).length) && (c = t.getBBox(), e = re(e).split(" "), n = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * c.width : parseFloat(e[0])) + c.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * c.height : parseFloat(e[1])) + c.y]), i.xOrigin = h = parseFloat(n[0]), i.yOrigin = u = parseFloat(n[1]), r && T !== Le && (f = T[0], c = T[1], p = T[2], _ = T[3], d = T[4], m = T[5], g = f * _ - c * p, o = h * (_ / g) + u * (-p / g) + (p * m - _ * d) / g, l = h * (-c / g) + u * (f / g) - (f * m - c * d) / g, h = i.xOrigin = n[0] = o, u = i.yOrigin = n[1] = l), x && (s || s !== !1 && a.defaultSmoothOrigin !== !1 ? (o = h - v, l = u - y, x.xOffset += o * T[0] + l * T[2] - o, x.yOffset += o * T[1] + l * T[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", n.join(" "))
				},
				Ne = function (t) {
					return !!(Ce && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
				},
				Le = [1, 0, 0, 1, 0, 0],
				Fe = function (t, e) {
					var i, r, s, n, a, o = t._gsTransform || new ke,
						l = 1e5;
					if (be ? r = Q(t, Pe, null, !0) : t.currentStyle && (r = t.currentStyle.filter.match(A), r = r && 4 === r.length ? [r[0].substr(4), Number(r[2].substr(4)), Number(r[1].substr(4)), r[3].substr(4), o.x || 0, o.y || 0].join(",") : ""), i = !r || "none" === r || "matrix(1, 0, 0, 1, 0, 0)" === r, (o.svg || t.getBBox && Ne(t)) && (i && -1 !== (t.style[be] + "").indexOf("matrix") && (r = t.style[be], i = 0), s = t.getAttribute("transform"), i && s && (-1 !== s.indexOf("matrix") ? (r = s, i = 0) : -1 !== s.indexOf("translate") && (r = "matrix(1,0,0,1," + s.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Le;
					for (s = (r || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], ge = s.length; --ge > -1;) n = Number(s[ge]), s[ge] = (a = n - (n |= 0)) ? (0 | a * l + (0 > a ? -.5 : .5)) / l + n : n;
					return e && s.length > 6 ? [s[0], s[1], s[4], s[5], s[12], s[13]] : s
				},
				Xe = I.getTransform = function (t, i, r, n) {
					if (t._gsTransform && r && !n) return t._gsTransform;
					var o, l, h, u, f, c, p = r ? t._gsTransform || new ke : new ke,
						_ = 0 > p.scaleX,
						d = 2e-5,
						m = 1e5,
						g = Oe ? parseFloat(Q(t, Se, i, !1, "0 0 0").split(" ")[2]) || p.zOrigin || 0 : 0,
						v = parseFloat(a.defaultTransformPerspective) || 0;
					if (p.svg = !(!t.getBBox || !Ne(t)), p.svg && (De(t, Q(t, Se, s, !1, "50% 50%") + "", p, t.getAttribute("data-svg-origin")), Te = a.useSVGTransformAttr || Me), o = Fe(t), o !== Le) {
						if (16 === o.length) {
							var y, x, T, w, b, P = o[0],
								S = o[1],
								O = o[2],
								k = o[3],
								C = o[4],
								R = o[5],
								A = o[6],
								M = o[7],
								D = o[8],
								N = o[9],
								F = o[10],
								X = o[12],
								z = o[13],
								B = o[14],
								E = o[11],
								I = Math.atan2(A, F);
							p.zOrigin && (B = -p.zOrigin, X = D * B - o[12], z = N * B - o[13], B = F * B + p.zOrigin - o[14]), p.rotationX = I * L, I && (w = Math.cos(-I), b = Math.sin(-I), y = C * w + D * b, x = R * w + N * b, T = A * w + F * b, D = C * -b + D * w, N = R * -b + N * w, F = A * -b + F * w, E = M * -b + E * w, C = y, R = x, A = T), I = Math.atan2(D, F), p.rotationY = I * L, I && (w = Math.cos(-I), b = Math.sin(-I), y = P * w - D * b, x = S * w - N * b, T = O * w - F * b, N = S * b + N * w, F = O * b + F * w, E = k * b + E * w, P = y, S = x, O = T), I = Math.atan2(S, P), p.rotation = I * L, I && (w = Math.cos(-I), b = Math.sin(-I), P = P * w + C * b, x = S * w + R * b, R = S * -b + R * w, A = O * -b + A * w, S = x), p.rotationX && Math.abs(p.rotationX) + Math.abs(p.rotation) > 359.9 && (p.rotationX = p.rotation = 0, p.rotationY += 180), p.scaleX = (0 | Math.sqrt(P * P + S * S) * m + .5) / m, p.scaleY = (0 | Math.sqrt(R * R + N * N) * m + .5) / m, p.scaleZ = (0 | Math.sqrt(A * A + F * F) * m + .5) / m, p.skewX = 0, p.perspective = E ? 1 / (0 > E ? -E : E) : 0, p.x = X, p.y = z, p.z = B, p.svg && (p.x -= p.xOrigin - (p.xOrigin * P - p.yOrigin * C), p.y -= p.yOrigin - (p.yOrigin * S - p.xOrigin * R))
						} else if (!(Oe && !n && o.length && p.x === o[4] && p.y === o[5] && (p.rotationX || p.rotationY) || void 0 !== p.x && "none" === Q(t, "display", i))) {
							var Y = o.length >= 6,
								W = Y ? o[0] : 1,
								V = o[1] || 0,
								j = o[2] || 0,
								G = Y ? o[3] : 1;
							p.x = o[4] || 0, p.y = o[5] || 0, h = Math.sqrt(W * W + V * V), u = Math.sqrt(G * G + j * j), f = W || V ? Math.atan2(V, W) * L : p.rotation || 0, c = j || G ? Math.atan2(j, G) * L + f : p.skewX || 0, Math.abs(c) > 90 && 270 > Math.abs(c) && (_ ? (h *= -1, c += 0 >= f ? 180 : -180, f += 0 >= f ? 180 : -180) : (u *= -1, c += 0 >= c ? 180 : -180)), p.scaleX = h, p.scaleY = u, p.rotation = f, p.skewX = c, Oe && (p.rotationX = p.rotationY = p.z = 0, p.perspective = v, p.scaleZ = 1), p.svg && (p.x -= p.xOrigin - (p.xOrigin * W + p.yOrigin * j), p.y -= p.yOrigin - (p.xOrigin * V + p.yOrigin * G))
						}
						p.zOrigin = g;
						for (l in p) d > p[l] && p[l] > -d && (p[l] = 0)
					}
					return r && (t._gsTransform = p, p.svg && (Te && t.style[be] ? e.delayedCall(.001, function () {
						Ie(t.style, be)
					}) : !Te && t.getAttribute("transform") && e.delayedCall(.001, function () {
						t.removeAttribute("transform")
					}))), p
				},
				ze = function (t) {
					var e, i, r = this.data,
						s = -r.rotation * N,
						n = s + r.skewX * N,
						a = 1e5,
						o = (0 | Math.cos(s) * r.scaleX * a) / a,
						l = (0 | Math.sin(s) * r.scaleX * a) / a,
						h = (0 | Math.sin(n) * -r.scaleY * a) / a,
						u = (0 | Math.cos(n) * r.scaleY * a) / a,
						f = this.t.style,
						c = this.t.currentStyle;
					if (c) {
						i = l, l = -h, h = -i, e = c.filter, f.filter = "";
						var p, _, m = this.t.offsetWidth,
							g = this.t.offsetHeight,
							v = "absolute" !== c.position,
							y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
							w = r.x + m * r.xPercent / 100,
							b = r.y + g * r.yPercent / 100;
						if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, _ = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, w += p - (p * o + _ * l), b += _ - (p * h + _ * u)), v ? (p = m / 2, _ = g / 2, y += ", Dx=" + (p - (p * o + _ * l) + w) + ", Dy=" + (_ - (p * h + _ * u) + b) + ")") : y += ", sizingMethod='auto expand')", f.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(M, y) : y + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf("gradient(" && e.indexOf("Alpha")) && f.removeAttribute("filter")), !v) {
							var P, S, O, k = 8 > d ? 1 : -1;
							for (p = r.ieOffsetX || 0, _ = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > o ? -o : o) * m + (0 > l ? -l : l) * g)) / 2 + w), r.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + b), ge = 0; 4 > ge; ge++) S = ee[ge], P = c[S], i = -1 !== P.indexOf("px") ? parseFloat(P) : Z(this.t, S, parseFloat(P), P.replace(x, "")) || 0, O = i !== r[S] ? 2 > ge ? -r.ieOffsetX : -r.ieOffsetY : 2 > ge ? p - r.ieOffsetX : _ - r.ieOffsetY, f[S] = (r[S] = Math.round(i - O * (0 === ge || 2 === ge ? 1 : k))) + "px"
						}
					}
				},
				Be = I.set3DTransformRatio = I.setTransformRatio = function (t) {
					var e, i, r, s, n, a, o, l, h, u, f, c, _, d, m, g, v, y, x, T, w, b, P, S = this.data,
						O = this.t.style,
						k = S.rotation,
						C = S.rotationX,
						R = S.rotationY,
						A = S.scaleX,
						M = S.scaleY,
						D = S.scaleZ,
						L = S.x,
						F = S.y,
						X = S.z,
						z = S.svg,
						B = S.perspective,
						E = S.force3D;
					if (!(((1 !== t && 0 !== t || "auto" !== E || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && E || X || B || R || C) && (!Te || !z) && Oe)) return k || S.skewX || z ? (k *= N, b = S.skewX * N, P = 1e5, e = Math.cos(k) * A, s = Math.sin(k) * A, i = Math.sin(k - b) * -M, n = Math.cos(k - b) * M, b && "simple" === S.skewType && (v = Math.tan(b), v = Math.sqrt(1 + v * v), i *= v, n *= v, S.skewY && (e *= v, s *= v)), z && (L += S.xOrigin - (S.xOrigin * e + S.yOrigin * i) + S.xOffset, F += S.yOrigin - (S.xOrigin * s + S.yOrigin * n) + S.yOffset, Te && (S.xPercent || S.yPercent) && (d = this.t.getBBox(), L += .01 * S.xPercent * d.width, F += .01 * S.yPercent * d.height), d = 1e-6, d > L && L > -d && (L = 0), d > F && F > -d && (F = 0)), x = (0 | e * P) / P + "," + (0 | s * P) / P + "," + (0 | i * P) / P + "," + (0 | n * P) / P + "," + L + "," + F + ")", z && Te ? this.t.setAttribute("transform", "matrix(" + x) : O[be] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + x) : O[be] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + A + ",0,0," + M + "," + L + "," + F + ")", void 0;
					if (p && (d = 1e-4, d > A && A > -d && (A = D = 2e-5), d > M && M > -d && (M = D = 2e-5), !B || S.z || S.rotationX || S.rotationY || (B = 0)), k || S.skewX) k *= N, m = e = Math.cos(k), g = s = Math.sin(k), S.skewX && (k -= S.skewX * N, m = Math.cos(k), g = Math.sin(k), "simple" === S.skewType && (v = Math.tan(S.skewX * N), v = Math.sqrt(1 + v * v), m *= v, g *= v, S.skewY && (e *= v, s *= v))), i = -g, n = m;
					else {
						if (!(R || C || 1 !== D || B || z)) return O[be] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + L + "px," + F + "px," + X + "px)" + (1 !== A || 1 !== M ? " scale(" + A + "," + M + ")" : ""), void 0;
						e = n = 1, i = s = 0
					}
					h = 1, r = a = o = l = u = f = 0, c = B ? -1 / B : 0, _ = S.zOrigin, d = 1e-6, T = ",", w = "0", k = R * N, k && (m = Math.cos(k), g = Math.sin(k), o = -g, u = c * -g, r = e * g, a = s * g, h = m, c *= m, e *= m, s *= m), k = C * N, k && (m = Math.cos(k), g = Math.sin(k), v = i * m + r * g, y = n * m + a * g, l = h * g, f = c * g, r = i * -g + r * m, a = n * -g + a * m, h *= m, c *= m, i = v, n = y), 1 !== D && (r *= D, a *= D, h *= D, c *= D), 1 !== M && (i *= M, n *= M, l *= M, f *= M), 1 !== A && (e *= A, s *= A, o *= A, u *= A), (_ || z) && (_ && (L += r * -_, F += a * -_, X += h * -_ + _), z && (L += S.xOrigin - (S.xOrigin * e + S.yOrigin * i) + S.xOffset, F += S.yOrigin - (S.xOrigin * s + S.yOrigin * n) + S.yOffset), d > L && L > -d && (L = w), d > F && F > -d && (F = w), d > X && X > -d && (X = 0)), x = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", x += (d > e && e > -d ? w : e) + T + (d > s && s > -d ? w : s) + T + (d > o && o > -d ? w : o), x += T + (d > u && u > -d ? w : u) + T + (d > i && i > -d ? w : i) + T + (d > n && n > -d ? w : n), C || R ? (x += T + (d > l && l > -d ? w : l) + T + (d > f && f > -d ? w : f) + T + (d > r && r > -d ? w : r), x += T + (d > a && a > -d ? w : a) + T + (d > h && h > -d ? w : h) + T + (d > c && c > -d ? w : c) + T) : x += ",0,0,0,0,1,0,", x += L + T + F + T + X + T + (B ? 1 + -X / B : 1) + ")", O[be] = x
				};
			h = ke.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, ye("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
				parser: function (t, e, i, r, n, o, l) {
					if (r._lastParsedTransform === l) return n;
					r._lastParsedTransform = l;
					var h, u, f, c, p, _, d, m, g, v = t._gsTransform,
						y = r._transform = Xe(t, s, !0, l.parseTransform),
						x = t.style,
						T = 1e-6,
						w = we.length,
						b = l,
						P = {},
						S = "transformOrigin";
					if ("string" == typeof b.transform && be) f = B.style, f[be] = b.transform, f.display = "block", f.position = "absolute", X.body.appendChild(B), h = Xe(B, null, !1), X.body.removeChild(B), null != b.xPercent && (h.xPercent = ne(b.xPercent, y.xPercent)), null != b.yPercent && (h.yPercent = ne(b.yPercent, y.yPercent));
					else if ("object" == typeof b) {
						if (h = {
								scaleX: ne(null != b.scaleX ? b.scaleX : b.scale, y.scaleX),
								scaleY: ne(null != b.scaleY ? b.scaleY : b.scale, y.scaleY),
								scaleZ: ne(b.scaleZ, y.scaleZ),
								x: ne(b.x, y.x),
								y: ne(b.y, y.y),
								z: ne(b.z, y.z),
								xPercent: ne(b.xPercent, y.xPercent),
								yPercent: ne(b.yPercent, y.yPercent),
								perspective: ne(b.transformPerspective, y.perspective)
							}, d = b.directionalRotation, null != d)
							if ("object" == typeof d)
								for (f in d) b[f] = d[f];
							else b.rotation = d;
						"string" == typeof b.x && -1 !== b.x.indexOf("%") && (h.x = 0, h.xPercent = ne(b.x, y.xPercent)), "string" == typeof b.y && -1 !== b.y.indexOf("%") && (h.y = 0, h.yPercent = ne(b.y, y.yPercent)), h.rotation = ae("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : y.rotation, y.rotation, "rotation", P), Oe && (h.rotationX = ae("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : y.rotationX || 0, y.rotationX, "rotationX", P), h.rotationY = ae("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : y.rotationY || 0, y.rotationY, "rotationY", P)), h.skewX = null == b.skewX ? y.skewX : ae(b.skewX, y.skewX), h.skewY = null == b.skewY ? y.skewY : ae(b.skewY, y.skewY), (u = h.skewY - y.skewY) && (h.skewX += u, h.rotation += u)
					}
					for (Oe && null != b.force3D && (y.force3D = b.force3D, _ = !0), y.skewType = b.skewType || y.skewType || a.defaultSkewType, p = y.force3D || y.z || y.rotationX || y.rotationY || h.z || h.rotationX || h.rotationY || h.perspective, p || null == b.scale || (h.scaleZ = 1); --w > -1;) i = we[w], c = h[i] - y[i], (c > T || -T > c || null != b[i] || null != F[i]) && (_ = !0, n = new _e(y, i, y[i], c, n), i in P && (n.e = P[i]), n.xs0 = 0, n.plugin = o, r._overwriteProps.push(n.n));
					return c = b.transformOrigin, y.svg && (c || b.svgOrigin) && (m = y.xOffset, g = y.yOffset, De(t, re(c), h, b.svgOrigin, b.smoothOrigin), n = de(y, "xOrigin", (v ? y : h).xOrigin, h.xOrigin, n, S), n = de(y, "yOrigin", (v ? y : h).yOrigin, h.yOrigin, n, S), (m !== y.xOffset || g !== y.yOffset) && (n = de(y, "xOffset", v ? m : y.xOffset, y.xOffset, n, S), n = de(y, "yOffset", v ? g : y.yOffset, y.yOffset, n, S)), c = Te ? null : "0px 0px"), (c || Oe && p && y.zOrigin) && (be ? (_ = !0, i = Se, c = (c || Q(t, i, s, !1, "50% 50%")) + "", n = new _e(x, i, 0, 0, n, -1, S), n.b = x[i], n.plugin = o, Oe ? (f = y.zOrigin, c = c.split(" "), y.zOrigin = (c.length > 2 && (0 === f || "0px" !== c[2]) ? parseFloat(c[2]) : f) || 0, n.xs0 = n.e = c[0] + " " + (c[1] || "50%") + " 0px", n = new _e(y, "zOrigin", 0, 0, n, -1, n.n), n.b = f, n.xs0 = n.e = y.zOrigin) : n.xs0 = n.e = c) : re(c + "", y)), _ && (r._transformType = y.svg && Te || !p && 3 !== this._transformType ? 2 : 3), n
				},
				prefix: !0
			}), ye("boxShadow", {
				defaultValue: "0px 0px 0px 0px #999",
				prefix: !0,
				color: !0,
				multi: !0,
				keyword: "inset"
			}), ye("borderRadius", {
				defaultValue: "0px",
				parser: function (t, e, i, n, a) {
					e = this.format(e);
					var o, l, h, u, f, c, p, _, d, m, g, v, y, x, T, w, b = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
						P = t.style;
					for (d = parseFloat(t.offsetWidth), m = parseFloat(t.offsetHeight), o = e.split(" "), l = 0; b.length > l; l++) this.p.indexOf("border") && (b[l] = q(b[l])), f = u = Q(t, b[l], s, !1, "0px"), -1 !== f.indexOf(" ") && (u = f.split(" "), f = u[0], u = u[1]), c = h = o[l], p = parseFloat(f), v = f.substr((p + "").length), y = "=" === c.charAt(1), y ? (_ = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), _ *= parseFloat(c), g = c.substr((_ + "").length - (0 > _ ? 1 : 0)) || "") : (_ = parseFloat(c), g = c.substr((_ + "").length)), "" === g && (g = r[i] || v), g !== v && (x = Z(t, "borderLeft", p, v), T = Z(t, "borderTop", p, v), "%" === g ? (f = 100 * (x / d) + "%", u = 100 * (T / m) + "%") : "em" === g ? (w = Z(t, "borderLeft", 1, "em"), f = x / w + "em", u = T / w + "em") : (f = x + "px", u = T + "px"), y && (c = parseFloat(f) + _ + g, h = parseFloat(u) + _ + g)), a = me(P, b[l], f + " " + u, c + " " + h, !1, "0px", a);
					return a
				},
				prefix: !0,
				formatter: fe("0px 0px 0px 0px", !1, !0)
			}), ye("backgroundPosition", {
				defaultValue: "0 0",
				parser: function (t, e, i, r, n, a) {
					var o, l, h, u, f, c, p = "background-position",
						_ = s || H(t, null),
						m = this.format((_ ? d ? _.getPropertyValue(p + "-x") + " " + _.getPropertyValue(p + "-y") : _.getPropertyValue(p) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
						g = this.format(e);
					if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (c = Q(t, "backgroundImage").replace(k, ""), c && "none" !== c)) {
						for (o = m.split(" "), l = g.split(" "), E.setAttribute("src", c), h = 2; --h > -1;) m = o[h], u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (f = 0 === h ? t.offsetWidth - E.width : t.offsetHeight - E.height, o[h] = u ? parseFloat(m) / 100 * f + "px" : 100 * (parseFloat(m) / f) + "%");
						m = o.join(" ")
					}
					return this.parseComplex(t.style, m, g, n, a)
				},
				formatter: re
			}), ye("backgroundSize", {
				defaultValue: "0 0",
				formatter: re
			}), ye("perspective", {
				defaultValue: "0px",
				prefix: !0
			}), ye("perspectiveOrigin", {
				defaultValue: "50% 50%",
				prefix: !0
			}), ye("transformStyle", {
				prefix: !0
			}), ye("backfaceVisibility", {
				prefix: !0
			}), ye("userSelect", {
				prefix: !0
			}), ye("margin", {
				parser: ce("marginTop,marginRight,marginBottom,marginLeft")
			}), ye("padding", {
				parser: ce("paddingTop,paddingRight,paddingBottom,paddingLeft")
			}), ye("clip", {
				defaultValue: "rect(0px,0px,0px,0px)",
				parser: function (t, e, i, r, n, a) {
					var o, l, h;
					return 9 > d ? (l = t.currentStyle, h = 8 > d ? " " : ",", o = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (o = this.format(Q(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, o, e, n, a)
				}
			}), ye("textShadow", {
				defaultValue: "0px 0px 0px #999",
				color: !0,
				multi: !0
			}), ye("autoRound,strictUnits", {
				parser: function (t, e, i, r, s) {
					return s
				}
			}), ye("border", {
				defaultValue: "0px solid #000",
				parser: function (t, e, i, r, n, a) {
					return this.parseComplex(t.style, this.format(Q(t, "borderTopWidth", s, !1, "0px") + " " + Q(t, "borderTopStyle", s, !1, "solid") + " " + Q(t, "borderTopColor", s, !1, "#000")), this.format(e), n, a)
				},
				color: !0,
				formatter: function (t) {
					var e = t.split(" ");
					return e[0] + " " + (e[1] || "solid") + " " + (t.match(ue) || ["#000"])[0]
				}
			}), ye("borderWidth", {
				parser: ce("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
			}), ye("float,cssFloat,styleFloat", {
				parser: function (t, e, i, r, s) {
					var n = t.style,
						a = "cssFloat" in n ? "cssFloat" : "styleFloat";
					return new _e(n, a, 0, 0, s, -1, i, !1, 0, n[a], e)
				}
			});
			var Ee = function (t) {
				var e, i = this.t,
					r = i.filter || Q(this.data, "filter") || "",
					s = 0 | this.s + this.c * t;
				100 === s && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (i.removeAttribute("filter"), e = !Q(this.data, "filter")) : (i.filter = r.replace(b, ""), e = !0)), e || (this.xn1 && (i.filter = r = r || "alpha(opacity=" + s + ")"), -1 === r.indexOf("pacity") ? 0 === s && this.xn1 || (i.filter = r + " alpha(opacity=" + s + ")") : i.filter = r.replace(T, "opacity=" + s))
			};
			ye("opacity,alpha,autoAlpha", {
				defaultValue: "1",
				parser: function (t, e, i, r, n, a) {
					var o = parseFloat(Q(t, "opacity", s, !1, "1")),
						l = t.style,
						h = "autoAlpha" === i;
					return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + o), h && 1 === o && "hidden" === Q(t, "visibility", s) && 0 !== e && (o = 0), W ? n = new _e(l, "opacity", o, e - o, n) : (n = new _e(l, "opacity", 100 * o, 100 * (e - o), n), n.xn1 = h ? 1 : 0, l.zoom = 1, n.type = 2, n.b = "alpha(opacity=" + n.s + ")", n.e = "alpha(opacity=" + (n.s + n.c) + ")", n.data = t, n.plugin = a, n.setRatio = Ee), h && (n = new _e(l, "visibility", 0, 0, n, -1, null, !1, 0, 0 !== o ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), n.xs0 = "inherit", r._overwriteProps.push(n.n), r._overwriteProps.push(i)), n
				}
			});
			var Ie = function (t, e) {
					e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
				},
				Ye = function (t) {
					if (this.t._gsClassPT = this, 1 === t || 0 === t) {
						this.t.setAttribute("class", 0 === t ? this.b : this.e);
						for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Ie(i, e.p), e = e._next;
						1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
					} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
				};
			ye("className", {
				parser: function (t, e, r, n, a, o, l) {
					var h, u, f, c, p, _ = t.getAttribute("class") || "",
						d = t.style.cssText;
					if (a = n._classNamePT = new _e(t, r, 0, 0, a, 2), a.setRatio = Ye, a.pr = -11, i = !0, a.b = _, u = K(t, s), f = t._gsClassPT) {
						for (c = {}, p = f.data; p;) c[p.p] = 1, p = p._next;
						f.setRatio(1)
					}
					return t._gsClassPT = a, a.e = "=" !== e.charAt(1) ? e : _.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", a.e), h = J(t, u, K(t), l, c), t.setAttribute("class", _), a.data = h.firstMPT, t.style.cssText = d, a = a.xfirst = n.parse(t, h.difs, a, o)
				}
			});
			var We = function (t) {
				if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
					var e, i, r, s, n, a = this.t.style,
						o = l.transform.parse;
					if ("all" === this.e) a.cssText = "", s = !0;
					else
						for (e = this.e.split(" ").join("").split(","), r = e.length; --r > -1;) i = e[r], l[i] && (l[i].parse === o ? s = !0 : i = "transformOrigin" === i ? Se : l[i].p), Ie(a, i);
					s && (Ie(a, be), n = this.t._gsTransform, n && (n.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
				}
			};
			for (ye("clearProps", {
					parser: function (t, e, r, s, n) {
						return n = new _e(t, r, 0, 0, n, 2), n.setRatio = We, n.e = e, n.pr = -10, n.data = s._tween, i = !0, n
					}
				}), h = "bezier,throwProps,physicsProps,physics2D".split(","), ge = h.length; ge--;) xe(h[ge]);
			h = a.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function (t, e, o) {
				if (!t.nodeType) return !1;
				this._target = t, this._tween = o, this._vars = e, u = e.autoRound, i = !1, r = e.suffixMap || a.suffixMap, s = H(t, ""), n = this._overwriteProps;
				var h, p, d, m, g, v, y, x, T, b = t.style;
				if (f && "" === b.zIndex && (h = Q(t, "zIndex", s), ("auto" === h || "" === h) && this._addLazySet(b, "zIndex", 0)), "string" == typeof e && (m = b.cssText, h = K(t, s), b.cssText = m + ";" + e, h = J(t, h, K(t)).difs, !W && w.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, b.cssText = m), this._firstPT = p = e.className ? l.className.parse(t, e.className, "className", this, null, null, e) : this.parse(t, e, null), this._transformType) {
					for (T = 3 === this._transformType, be ? c && (f = !0, "" === b.zIndex && (y = Q(t, "zIndex", s), ("auto" === y || "" === y) && this._addLazySet(b, "zIndex", 0)), _ && this._addLazySet(b, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (T ? "visible" : "hidden"))) : b.zoom = 1, d = p; d && d._next;) d = d._next;
					x = new _e(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, d), x.setRatio = be ? Be : ze, x.data = this._transform || Xe(t, s, !0), x.tween = o, x.pr = -1, n.pop()
				}
				if (i) {
					for (; p;) {
						for (v = p._next, d = m; d && d.pr > p.pr;) d = d._next;
						(p._prev = d ? d._prev : g) ? p._prev._next = p: m = p, (p._next = d) ? d._prev = p : g = p, p = v
					}
					this._firstPT = m
				}
				return !0
			}, h.parse = function (t, e, i, n) {
				var a, o, h, f, c, p, _, d, m, g, v = t.style;
				for (a in e) p = e[a], o = l[a], o ? i = o.parse(t, p, a, this, i, n, e) : (c = Q(t, a, s) + "", m = "string" == typeof p, "color" === a || "fill" === a || "stroke" === a || -1 !== a.indexOf("Color") || m && P.test(p) ? (m || (p = he(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), i = me(v, a, c, p, !0, "transparent", i, 0, n)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (h = parseFloat(c), _ = h || 0 === h ? c.substr((h + "").length) : "", ("" === c || "auto" === c) && ("width" === a || "height" === a ? (h = ie(t, a, s), _ = "px") : "left" === a || "top" === a ? (h = $(t, a, s), _ = "px") : (h = "opacity" !== a ? 0 : 1, _ = "")), g = m && "=" === p.charAt(1), g ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), d = p.replace(x, "")) : (f = parseFloat(p), d = m ? p.replace(x, "") : ""), "" === d && (d = a in r ? r[a] : _), p = f || 0 === f ? (g ? f + h : f) + d : e[a], _ !== d && "" !== d && (f || 0 === f) && h && (h = Z(t, a, h, _), "%" === d ? (h /= Z(t, a, 100, "%") / 100, e.strictUnits !== !0 && (c = h + "%")) : "em" === d ? h /= Z(t, a, 1, "em") : "px" !== d && (f = Z(t, a, f, d), d = "px"), g && (f || 0 === f) && (p = f + h + d)), g && (f += h), !h && 0 !== h || !f && 0 !== f ? void 0 !== v[a] && (p || "NaN" != p + "" && null != p) ? (i = new _e(v, a, f || h || 0, 0, i, -1, a, !1, 0, c, p), i.xs0 = "none" !== p || "display" !== a && -1 === a.indexOf("Style") ? p : c) : j("invalid " + a + " tween value: " + e[a]) : (i = new _e(v, a, h, f - h, i, 0, a, u !== !1 && ("px" === d || "zIndex" === a), 0, c, p), i.xs0 = d)) : i = me(v, a, c, p, !0, null, i, 0, n)), n && i && !i.plugin && (i.plugin = n);
				return i
			}, h.setRatio = function (t) {
				var e, i, r, s = this._firstPT,
					n = 1e-6;
				if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
					if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
						for (; s;) {
							if (e = s.c * t + s.s, s.r ? e = Math.round(e) : n > e && e > -n && (e = 0), s.type)
								if (1 === s.type)
									if (r = s.l, 2 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2;
									else if (3 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3;
							else if (4 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4;
							else if (5 === r) s.t[s.p] = s.xs0 + e + s.xs1 + s.xn1 + s.xs2 + s.xn2 + s.xs3 + s.xn3 + s.xs4 + s.xn4 + s.xs5;
							else {
								for (i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++) i += s["xn" + r] + s["xs" + (r + 1)];
								s.t[s.p] = i
							} else -1 === s.type ? s.t[s.p] = s.xs0 : s.setRatio && s.setRatio(t);
							else s.t[s.p] = e + s.xs0;
							s = s._next
						} else
							for (; s;) 2 !== s.type ? s.t[s.p] = s.b : s.setRatio(t), s = s._next;
					else
						for (; s;) {
							if (2 !== s.type)
								if (s.r && -1 !== s.type)
									if (e = Math.round(s.s + s.c), s.type) {
										if (1 === s.type) {
											for (r = s.l, i = s.xs0 + e + s.xs1, r = 1; s.l > r; r++) i += s["xn" + r] + s["xs" + (r + 1)];
											s.t[s.p] = i
										}
									} else s.t[s.p] = e + s.xs0;
							else s.t[s.p] = s.e;
							else s.setRatio(t);
							s = s._next
						}
			}, h._enableTransforms = function (t) {
				this._transform = this._transform || Xe(this._target, s, !0), this._transformType = this._transform.svg && Te || !t && 3 !== this._transformType ? 2 : 3
			};
			var Ve = function () {
				this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
			};
			h._addLazySet = function (t, e, i) {
				var r = this._firstPT = new _e(t, e, 0, 0, this._firstPT, 2);
				r.e = i, r.setRatio = Ve, r.data = this
			}, h._linkCSSP = function (t, e, i, r) {
				return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, r = !0), i ? i._next = t : r || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
			}, h._kill = function (e) {
				var i, r, s, n = e;
				if (e.autoAlpha || e.alpha) {
					n = {};
					for (r in e) n[r] = e[r];
					n.opacity = 1, n.autoAlpha && (n.visibility = 1)
				}
				return e.className && (i = this._classNamePT) && (s = i.xfirst, s && s._prev ? this._linkCSSP(s._prev, i._next, s._prev._prev) : s === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, s._prev), this._classNamePT = null), t.prototype._kill.call(this, n)
			};
			var je = function (t, e, i) {
				var r, s, n, a;
				if (t.slice)
					for (s = t.length; --s > -1;) je(t[s], e, i);
				else
					for (r = t.childNodes, s = r.length; --s > -1;) n = r[s], a = n.type, n.style && (e.push(K(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || je(n, e, i)
			};
			return a.cascadeTo = function (t, i, r) {
				var s, n, a, o, l = e.to(t, i, r),
					h = [l],
					u = [],
					f = [],
					c = [],
					p = e._internals.reservedProps;
				for (t = l._targets || l.target, je(t, u, c), l.render(i, !0, !0), je(t, f), l.render(0, !0, !0), l._enabled(!0), s = c.length; --s > -1;)
					if (n = J(c[s], u[s], f[s]), n.firstMPT) {
						n = n.difs;
						for (a in r) p[a] && (n[a] = r[a]);
						o = {};
						for (a in n) o[a] = u[s][a];
						h.push(e.fromTo(c[s], i, o, n))
					} return h
			}, t.activate([a]), a
		}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function (t) {
		"use strict";
		var e = function () {
			return (_gsScope.GreenSockGlobals || _gsScope)[t]
		};
		"function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("../TweenLite.html"), module.exports = e())
	}("CSSPlugin");

/*!
 * VERSION: beta 0.3.3
 * DATE: 2014-10-29
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://www.greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(function (t) {
	"use strict";
	var e = t.GreenSockGlobals || t,
		i = function (t) {
			var i, s = t.split("."),
				r = e;
			for (i = 0; s.length > i; i++) r[s[i]] = r = r[s[i]] || {};
			return r
		},
		s = i("com.greensock.utils"),
		r = function (t) {
			var e = t.nodeType,
				i = "";
			if (1 === e || 9 === e || 11 === e) {
				if ("string" == typeof t.textContent) return t.textContent;
				for (t = t.firstChild; t; t = t.nextSibling) i += r(t)
			} else if (3 === e || 4 === e) return t.nodeValue;
			return i
		},
		n = document,
		a = n.defaultView ? n.defaultView.getComputedStyle : function () {},
		o = /([A-Z])/g,
		h = function (t, e, i, s) {
			var r;
			return (i = i || a(t, null)) ? (t = i.getPropertyValue(e.replace(o, "-$1").toLowerCase()), r = t || i.length ? t : i[e]) : t.currentStyle && (i = t.currentStyle, r = i[e]), s ? r : parseInt(r, 10) || 0
		},
		l = function (t) {
			return t.length && t[0] && (t[0].nodeType && t[0].style && !t.nodeType || t[0].length && t[0][0]) ? !0 : !1
		},
		_ = function (t) {
			var e, i, s, r = [],
				n = t.length;
			for (e = 0; n > e; e++)
				if (i = t[e], l(i))
					for (s = i.length, s = 0; i.length > s; s++) r.push(i[s]);
				else r.push(i);
			return r
		},
		u = ")eefec303079ad17405c",
		c = /(?:<br>|<br\/>|<br \/>)/gi,
		f = n.all && !n.addEventListener,
		p = "<div style='position:relative;display:inline-block;" + (f ? "*display:inline;*zoom:1;'" : "'"),
		m = function (t) {
			t = t || "";
			var e = -1 !== t.indexOf("++"),
				i = 1;
			return e && (t = t.split("++").join("")),
				function () {
					return p + (t ? " class='" + t + (e ? i++ : "") + "'>" : ">")
				}
		},
		d = s.SplitText = e.SplitText = function (t, e) {
			if ("string" == typeof t && (t = d.selector(t)), !t) throw "cannot split a null element.";
			this.elements = l(t) ? _(t) : [t], this.chars = [], this.words = [], this.lines = [], this._originals = [], this.vars = e || {}, this.split(e)
		},
		g = function (t, e, i) {
			var s = t.nodeType;
			if (1 === s || 9 === s || 11 === s)
				for (t = t.firstChild; t; t = t.nextSibling) g(t, e, i);
			else(3 === s || 4 === s) && (t.nodeValue = t.nodeValue.split(e).join(i))
		},
		v = function (t, e) {
			for (var i = e.length; --i > -1;) t.push(e[i])
		},
		y = function (t, e, i, s, o) {
			c.test(t.innerHTML) && (t.innerHTML = t.innerHTML.replace(c, u));
			var l, _, f, p, d, y, T, w, b, x, P, S, k, C, R = r(t),
				O = e.type || e.split || "chars,words,lines",
				A = -1 !== O.indexOf("lines") ? [] : null,
				D = -1 !== O.indexOf("words"),
				M = -1 !== O.indexOf("chars"),
				L = "absolute" === e.position || e.absolute === !0,
				z = L ? "&#173; " : " ",
				I = -999,
				E = a(t),
				N = h(t, "paddingLeft", E),
				F = h(t, "borderBottomWidth", E) + h(t, "borderTopWidth", E),
				B = h(t, "borderLeftWidth", E) + h(t, "borderRightWidth", E),
				X = h(t, "paddingTop", E) + h(t, "paddingBottom", E),
				j = h(t, "paddingLeft", E) + h(t, "paddingRight", E),
				U = h(t, "textAlign", E, !0),
				Y = t.clientHeight,
				q = t.clientWidth,
				V = "</div>",
				G = m(e.wordsClass),
				Q = m(e.charsClass),
				W = -1 !== (e.linesClass || "").indexOf("++"),
				Z = e.linesClass,
				H = -1 !== R.indexOf("<"),
				$ = !0,
				K = [],
				J = [],
				te = [];
			for (W && (Z = Z.split("++").join("")), H && (R = R.split("<").join("{{LT}}")), l = R.length, p = G(), d = 0; l > d; d++)
				if (T = R.charAt(d), ")" === T && R.substr(d, 20) === u) p += ($ ? V : "") + "<BR/>", $ = !1, d !== l - 20 && R.substr(d + 20, 20) !== u && (p += " " + G(), $ = !0), d += 19;
				else if (" " === T && " " !== R.charAt(d - 1) && d !== l - 1 && R.substr(d - 20, 20) !== u) {
				for (p += $ ? V : "", $ = !1;
					" " === R.charAt(d + 1);) p += z, d++;
				(")" !== R.charAt(d + 1) || R.substr(d + 1, 20) !== u) && (p += z + G(), $ = !0)
			} else p += M && " " !== T ? Q() + T + "</div>" : T;
			for (t.innerHTML = p + ($ ? V : ""), H && g(t, "{{LT}}", "<"), y = t.getElementsByTagName("*"), l = y.length, w = [], d = 0; l > d; d++) w[d] = y[d];
			if (A || L)
				for (d = 0; l > d; d++) b = w[d], f = b.parentNode === t, (f || L || M && !D) && (x = b.offsetTop, A && f && x !== I && "BR" !== b.nodeName && (_ = [], A.push(_), I = x), L && (b._x = b.offsetLeft, b._y = x, b._w = b.offsetWidth, b._h = b.offsetHeight), A && (D !== f && M || (_.push(b), b._x -= N), f && d && (w[d - 1]._wordEnd = !0), "BR" === b.nodeName && b.nextSibling && "BR" === b.nextSibling.nodeName && A.push([])));
			for (d = 0; l > d; d++) b = w[d], f = b.parentNode === t, "BR" !== b.nodeName ? (L && (S = b.style, D || f || (b._x += b.parentNode._x, b._y += b.parentNode._y), S.left = b._x + "px", S.top = b._y + "px", S.position = "absolute", S.display = "block", S.width = b._w + 1 + "px", S.height = b._h + "px"), D ? f && "" !== b.innerHTML ? J.push(b) : M && K.push(b) : f ? (t.removeChild(b), w.splice(d--, 1), l--) : !f && M && (x = !A && !L && b.nextSibling, t.appendChild(b), x || t.appendChild(n.createTextNode(" ")), K.push(b))) : A || L ? (t.removeChild(b), w.splice(d--, 1), l--) : D || t.appendChild(b);
			if (A) {
				for (L && (P = n.createElement("div"), t.appendChild(P), k = P.offsetWidth + "px", x = P.offsetParent === t ? 0 : t.offsetLeft, t.removeChild(P)), S = t.style.cssText, t.style.cssText = "display:none;"; t.firstChild;) t.removeChild(t.firstChild);
				for (C = !L || !D && !M, d = 0; A.length > d; d++) {
					for (_ = A[d], P = n.createElement("div"), P.style.cssText = "display:block;text-align:" + U + ";position:" + (L ? "absolute;" : "relative;"), Z && (P.className = Z + (W ? d + 1 : "")), te.push(P), l = _.length, y = 0; l > y; y++) "BR" !== _[y].nodeName && (b = _[y], P.appendChild(b), C && (b._wordEnd || D) && P.appendChild(n.createTextNode(" ")), L && (0 === y && (P.style.top = b._y + "px", P.style.left = N + x + "px"), b.style.top = "0px", x && (b.style.left = b._x - x + "px")));
					0 === l && (P.innerHTML = "&nbsp;"), D || M || (P.innerHTML = r(P).split(String.fromCharCode(160)).join(" ")), L && (P.style.width = k, P.style.height = b._h + "px"), t.appendChild(P)
				}
				t.style.cssText = S
			}
			L && (Y > t.clientHeight && (t.style.height = Y - X + "px", Y > t.clientHeight && (t.style.height = Y + F + "px")), q > t.clientWidth && (t.style.width = q - j + "px", q > t.clientWidth && (t.style.width = q + B + "px"))), v(i, K), v(s, J), v(o, te)
		},
		T = d.prototype;
	T.split = function (t) {
		this.isSplit && this.revert(), this.vars = t || this.vars, this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
		for (var e = this.elements.length; --e > -1;) this._originals[e] = this.elements[e].innerHTML, y(this.elements[e], this.vars, this.chars, this.words, this.lines);
		return this.chars.reverse(), this.words.reverse(), this.lines.reverse(), this.isSplit = !0, this
	}, T.revert = function () {
		if (!this._originals) throw "revert() call wasn't scoped properly.";
		for (var t = this._originals.length; --t > -1;) this.elements[t].innerHTML = this._originals[t];
		return this.chars = [], this.words = [], this.lines = [], this.isSplit = !1, this
	}, d.selector = t.$ || t.jQuery || function (e) {
		var i = t.$ || t.jQuery;
		return i ? (d.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
	}, d.version = "0.3.3"
})(_gsScope),
function (t) {
	"use strict";
	var e = function () {
		return (_gsScope.GreenSockGlobals || _gsScope)[t]
	};
	"function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (module.exports = e())
}("SplitText");

try {
	window.GreenSockGlobals = null;
	window._gsQueue = null;
	window._gsDefine = null;

	delete(window.GreenSockGlobals);
	delete(window._gsQueue);
	delete(window._gsDefine);
} catch (e) {}

try {
	window.GreenSockGlobals = oldgs;
	window._gsQueue = oldgs_queue;
} catch (e) {}

if (window.tplogs == true)
	try {
		console.groupEnd();
	} catch (e) {}

(function (e, t) {
	e.waitForImages = {
		hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
	};
	e.expr[":"].uncached = function (t) {
		var n = document.createElement("img");
		n.src = t.src;
		return e(t).is('img[src!=""]') && !n.complete
	};
	e.fn.waitForImages = function (t, n, r) {
		if (e.isPlainObject(arguments[0])) {
			n = t.each;
			r = t.waitForAll;
			t = t.finished
		}
		t = t || e.noop;
		n = n || e.noop;
		r = !!r;
		if (!e.isFunction(t) || !e.isFunction(n)) {
			throw new TypeError("An invalid callback was supplied.")
		}
		return this.each(function () {
			var i = e(this),
				s = [];
			if (r) {
				var o = e.waitForImages.hasImageProperties || [],
					u = /url\((['"]?)(.*?)\1\)/g;
				i.find("*").each(function () {
					var t = e(this);
					if (t.is("img:uncached")) {
						s.push({
							src: t.attr("src"),
							element: t[0]
						})
					}
					e.each(o, function (e, n) {
						var r = t.css(n);
						if (!r) {
							return true
						}
						var i;
						while (i = u.exec(r)) {
							s.push({
								src: i[2],
								element: t[0]
							})
						}
					})
				})
			} else {
				i.find("img:uncached").each(function () {
					s.push({
						src: this.src,
						element: this
					})
				})
			}
			var f = s.length,
				l = 0;
			if (f == 0) {
				t.call(i[0])
			}
			e.each(s, function (r, s) {
				var o = new Image;
				e(o).bind("load error", function (e) {
					l++;
					n.call(s.element, l, f, e.type == "load");
					if (l == f) {
						t.call(i[0]);
						return false
					}
				});
				o.src = s.src
			})
		})
	};
})(jQuery)