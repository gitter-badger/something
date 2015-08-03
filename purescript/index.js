(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (process){
// Generated by psc-bundle 0.7.0.0
var PS = { };
(function(exports) {
  /* global exports */
  "use strict";

  // module Control.Monad.Eff

  exports.returnE = function (a) {
    return function () {
      return a;
    };
  };

  exports.bindE = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };
 
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  //- Semiring -------------------------------------------------------------------

  exports.intAdd = function (x) {
    return function (y) {
      /* jshint bitwise: false */
      return x + y | 0;
    };
  };

  exports.intMul = function (x) {
    return function (y) {
      /* jshint bitwise: false */
      return x * y | 0;
    };
  };

  //- Ring -----------------------------------------------------------------------

  exports.intSub = function (x) {
    return function (y) {
      /* jshint bitwise: false */
      return x - y | 0;
    };
  };

  //- Eq -------------------------------------------------------------------------

  exports.refEq = function (r1) {
    return function (r2) {
      return r1 === r2;
    };
  };

  //- Ord ------------------------------------------------------------------------

  exports.unsafeCompareImpl = function (lt) {
    return function (eq) {
      return function (gt) {
        return function (x) {
          return function (y) {
            return x < y ? lt : x > y ? gt : eq;
          };
        };
      };
    };
  };
 
})(PS["Prelude"] = PS["Prelude"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Prelude"];
  var LT = (function () {
      function LT() {

      };
      LT.value = new LT();
      return LT;
  })();
  var GT = (function () {
      function GT() {

      };
      GT.value = new GT();
      return GT;
  })();
  var EQ = (function () {
      function EQ() {

      };
      EQ.value = new EQ();
      return EQ;
  })();
  var Semigroupoid = function (compose) {
      this.compose = compose;
  };
  var Functor = function (map) {
      this.map = map;
  };
  var Apply = function (__superclass_Prelude$dotFunctor_0, apply) {
      this["__superclass_Prelude.Functor_0"] = __superclass_Prelude$dotFunctor_0;
      this.apply = apply;
  };
  var Applicative = function (__superclass_Prelude$dotApply_0, pure) {
      this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
      this.pure = pure;
  };
  var Bind = function (__superclass_Prelude$dotApply_0, bind) {
      this["__superclass_Prelude.Apply_0"] = __superclass_Prelude$dotApply_0;
      this.bind = bind;
  };
  var Monad = function (__superclass_Prelude$dotApplicative_0, __superclass_Prelude$dotBind_1) {
      this["__superclass_Prelude.Applicative_0"] = __superclass_Prelude$dotApplicative_0;
      this["__superclass_Prelude.Bind_1"] = __superclass_Prelude$dotBind_1;
  };
  var Semiring = function (add, mul, one, zero) {
      this.add = add;
      this.mul = mul;
      this.one = one;
      this.zero = zero;
  };
  var Ring = function (__superclass_Prelude$dotSemiring_0, sub) {
      this["__superclass_Prelude.Semiring_0"] = __superclass_Prelude$dotSemiring_0;
      this.sub = sub;
  };
  var Eq = function (eq) {
      this.eq = eq;
  };
  var Ord = function (__superclass_Prelude$dotEq_0, compare) {
      this["__superclass_Prelude.Eq_0"] = __superclass_Prelude$dotEq_0;
      this.compare = compare;
  };
  var Bounded = function (bottom, top) {
      this.bottom = bottom;
      this.top = top;
  };
  var zero = function (dict) {
      return dict.zero;
  };
  var unsafeCompare = $foreign.unsafeCompareImpl(LT.value)(EQ.value)(GT.value);
  var top = function (dict) {
      return dict.top;
  };
  var sub = function (dict) {
      return dict.sub;
  };
  var $minus = function (__dict_Ring_0) {
      return sub(__dict_Ring_0);
  };                                                                            
  var semiringInt = new Semiring($foreign.intAdd, $foreign.intMul, 1, 0);
  var semigroupoidFn = new Semigroupoid(function (f) {
      return function (g) {
          return function (x) {
              return f(g(x));
          };
      };
  });                 
  var ringInt = new Ring(function () {
      return semiringInt;
  }, $foreign.intSub);
  var pure = function (dict) {
      return dict.pure;
  };
  var $$return = function (__dict_Applicative_2) {
      return pure(__dict_Applicative_2);
  };
  var otherwise = true;
  var one = function (dict) {
      return dict.one;
  };
  var negate = function (__dict_Ring_3) {
      return function (a) {
          return $minus(__dict_Ring_3)(zero(__dict_Ring_3["__superclass_Prelude.Semiring_0"]()))(a);
      };
  };
  var mul = function (dict) {
      return dict.mul;
  };
  var map = function (dict) {
      return dict.map;
  };                                                
  var flip = function (f) {
      return function (b) {
          return function (a) {
              return f(a)(b);
          };
      };
  };                
  var eqInt = new Eq($foreign.refEq);
  var ordInt = new Ord(function () {
      return eqInt;
  }, unsafeCompare);
  var eq = function (dict) {
      return dict.eq;
  };
  var compose = function (dict) {
      return dict.compose;
  };                                                   
  var $less$less$less = function (__dict_Semigroupoid_14) {
      return compose(__dict_Semigroupoid_14);
  };
  var compare = function (dict) {
      return dict.compare;
  }; 
  var boundedInt = new Bounded(negate(ringInt)(2147483648), 2147483647);
  var bottom = function (dict) {
      return dict.bottom;
  };
  var bind = function (dict) {
      return dict.bind;
  }; 
  var apply = function (dict) {
      return dict.apply;
  };
  var $less$times$greater = function (__dict_Apply_25) {
      return apply(__dict_Apply_25);
  };
  var liftA1 = function (__dict_Applicative_26) {
      return function (f) {
          return function (a) {
              return $less$times$greater(__dict_Applicative_26["__superclass_Prelude.Apply_0"]())(pure(__dict_Applicative_26)(f))(a);
          };
      };
  };
  var ap = function (__dict_Monad_30) {
      return function (f) {
          return function (a) {
              return bind(__dict_Monad_30["__superclass_Prelude.Bind_1"]())(f)(function (_2) {
                  return bind(__dict_Monad_30["__superclass_Prelude.Bind_1"]())(a)(function (_1) {
                      return $$return(__dict_Monad_30["__superclass_Prelude.Applicative_0"]())(_2(_1));
                  });
              });
          };
      };
  }; 
  var add = function (dict) {
      return dict.add;
  };
  exports["LT"] = LT;
  exports["GT"] = GT;
  exports["EQ"] = EQ;
  exports["Bounded"] = Bounded;
  exports["Ord"] = Ord;
  exports["Eq"] = Eq;
  exports["Ring"] = Ring;
  exports["Semiring"] = Semiring;
  exports["Monad"] = Monad;
  exports["Bind"] = Bind;
  exports["Applicative"] = Applicative;
  exports["Apply"] = Apply;
  exports["Functor"] = Functor;
  exports["Semigroupoid"] = Semigroupoid;
  exports["bottom"] = bottom;
  exports["top"] = top;
  exports["unsafeCompare"] = unsafeCompare;
  exports["compare"] = compare;
  exports["eq"] = eq;
  exports["negate"] = negate;
  exports["sub"] = sub;
  exports["one"] = one;
  exports["mul"] = mul;
  exports["zero"] = zero;
  exports["add"] = add;
  exports["ap"] = ap;
  exports["return"] = $$return;
  exports["bind"] = bind;
  exports["liftA1"] = liftA1;
  exports["pure"] = pure;
  exports["apply"] = apply;
  exports["map"] = map;
  exports["<<<"] = $less$less$less;
  exports["compose"] = compose;
  exports["otherwise"] = otherwise;
  exports["flip"] = flip;
  exports["semigroupoidFn"] = semigroupoidFn;
  exports["semiringInt"] = semiringInt;
  exports["ringInt"] = ringInt;
  exports["eqInt"] = eqInt;
  exports["ordInt"] = ordInt;
  exports["boundedInt"] = boundedInt;;
 
})(PS["Prelude"] = PS["Prelude"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Control.Monad.Eff"];
  var Prelude = PS["Prelude"];     
  var monadEff = new Prelude.Monad(function () {
      return applicativeEff;
  }, function () {
      return bindEff;
  });
  var bindEff = new Prelude.Bind(function () {
      return applyEff;
  }, $foreign.bindE);
  var applyEff = new Prelude.Apply(function () {
      return functorEff;
  }, Prelude.ap(monadEff));
  var applicativeEff = new Prelude.Applicative(function () {
      return applyEff;
  }, $foreign.returnE);
  var functorEff = new Prelude.Functor(Prelude.liftA1(applicativeEff));
  exports["functorEff"] = functorEff;
  exports["applyEff"] = applyEff;
  exports["applicativeEff"] = applicativeEff;
  exports["bindEff"] = bindEff;
  exports["monadEff"] = monadEff;;
 
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
  /* global exports, console */
  "use strict";

  // module Control.Monad.Eff.Console

  exports.log = function (s) {
    return function () {
      console.log(s);
      return {};
    };
  };
 
})(PS["Control.Monad.Eff.Console"] = PS["Control.Monad.Eff.Console"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Control.Monad.Eff.Console"];
  var Prelude = PS["Prelude"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  exports["log"] = $foreign.log;;
 
})(PS["Control.Monad.Eff.Console"] = PS["Control.Monad.Eff.Console"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  // module Control.Monad.Eff.Random

  exports.random = Math.random;
 
})(PS["Control.Monad.Eff.Random"] = PS["Control.Monad.Eff.Random"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  // module Data.Int

  exports.fromNumberImpl = function (just) {
    return function (nothing) {
      return function (n) {
        /* jshint bitwise: false */
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };

  exports.toNumber = function (n) {
    return n;
  };
 
})(PS["Data.Int"] = PS["Data.Int"] || {});
(function(exports) {
  /* global exports */
  "use strict";          

  exports.floor = Math.floor;
 
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Math"];
  exports["floor"] = $foreign.floor;;
 
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Extend = PS["Control.Extend"];
  var Control_MonadPlus = PS["Control.MonadPlus"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Monoid = PS["Data.Monoid"];     
  var Nothing = (function () {
      function Nothing() {

      };
      Nothing.value = new Nothing();
      return Nothing;
  })();
  var Just = (function () {
      function Just(value0) {
          this.value0 = value0;
      };
      Just.create = function (value0) {
          return new Just(value0);
      };
      return Just;
  })();
  exports["Nothing"] = Nothing;
  exports["Just"] = Just;;
 
})(PS["Data.Maybe"] = PS["Data.Maybe"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var Prelude = PS["Prelude"];
  var Data_Maybe = PS["Data.Maybe"];     
  var fromJust = function (_117) {
      if (_117 instanceof Data_Maybe.Just) {
          return _117.value0;
      };
      throw new Error("Failed pattern match at /home/edwin/projects/something/purescript/bower_components/purescript-maybe/src/Data/Maybe/Unsafe.purs line 10, column 1 - line 11, column 1: " + [ _117.constructor.name ]);
  };
  exports["fromJust"] = fromJust;;
 
})(PS["Data.Maybe.Unsafe"] = PS["Data.Maybe.Unsafe"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Data.Int"];
  var Prelude = PS["Prelude"];
  var $$Math = PS["Math"];
  var Data_Maybe_Unsafe = PS["Data.Maybe.Unsafe"];
  var Data_Int_Bits = PS["Data.Int.Bits"];
  var Data_Maybe = PS["Data.Maybe"];                                                         
  var fromNumber = $foreign.fromNumberImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  var unsafeClamp = function (x) {
      if (x >= $foreign.toNumber(Prelude.top(Prelude.boundedInt))) {
          return Prelude.top(Prelude.boundedInt);
      };
      if (x <= $foreign.toNumber(Prelude.bottom(Prelude.boundedInt))) {
          return Prelude.bottom(Prelude.boundedInt);
      };
      if (Prelude.otherwise) {
          return Data_Maybe_Unsafe.fromJust(fromNumber(x));
      };
      throw new Error("Failed pattern match at /home/edwin/projects/something/purescript/bower_components/purescript-integers/src/Data/Int.purs line 48, column 1 - line 49, column 1: " + [ x.constructor.name ]);
  };                                                                            
  var floor = Prelude["<<<"](Prelude.semigroupoidFn)(unsafeClamp)($$Math.floor);
  exports["floor"] = floor;
  exports["fromNumber"] = fromNumber;
  exports["toNumber"] = $foreign.toNumber;;
 
})(PS["Data.Int"] = PS["Data.Int"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Control.Monad.Eff.Random"];
  var Prelude = PS["Prelude"];
  var Data_Int = PS["Data.Int"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var randomInt = function (low) {
      return function (high) {
          return function __do() {
              var _1 = $foreign.random();
              return (function () {
                  var asNumber = ((Data_Int.toNumber(high) - Data_Int.toNumber(low)) + 1) * _1 + Data_Int.toNumber(low);
                  return Prelude["return"](Control_Monad_Eff.applicativeEff)(Data_Int.floor(asNumber));
              })()();
          };
      };
  };
  exports["randomInt"] = randomInt;;
 
})(PS["Control.Monad.Eff.Random"] = PS["Control.Monad.Eff.Random"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  // module Main

  exports.closeInterface = function (readline) {
    return function () {
      readline.close();
    };
  };
 
})(PS["Main"] = PS["Main"] || {});
(function(exports) {
  /* global exports */
  "use strict";

  // module Node.ReadLine

  exports.setLineHandler = function(callback) {
      return function(readline) {
          return function() {
              readline.removeAllListeners('line');
              readline.on('line', function(line) {
                  callback(line)();
              });
              return readline;
          };
      };
  };

  exports.prompt = function(readline) {
      return function() {
          readline.prompt();
          return readline;
      };
  };

  exports.createInterface = function(completer) {
      return function() {
          var readline = require('readline');
          return readline.createInterface({
              input: process.stdin,
              output: process.stdout,
              completer: function(line) {
                  var res = completer(line)();
                  return [res.completions, res.suffix];
              }
          });
      };
  };
})(PS["Node.ReadLine"] = PS["Node.ReadLine"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Node.ReadLine"];
  var Prelude = PS["Prelude"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Eff_Console = PS["Control.Monad.Eff.Console"];     
  var noCompletion = function (s) {
      return Prelude["return"](Control_Monad_Eff.applicativeEff)({
          completions: [  ], 
          matched: s
      });
  };
  exports["noCompletion"] = noCompletion;
  exports["createInterface"] = $foreign.createInterface;
  exports["prompt"] = $foreign.prompt;
  exports["setLineHandler"] = $foreign.setLineHandler;;
 
})(PS["Node.ReadLine"] = PS["Node.ReadLine"] || {});
(function(exports) {
  "use strict";

  // module Unsafe.Coerce

  exports.unsafeCoerce = function(x) { return x; }
 
})(PS["Unsafe.Coerce"] = PS["Unsafe.Coerce"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Unsafe.Coerce"];
  exports["unsafeCoerce"] = $foreign.unsafeCoerce;;
 
})(PS["Unsafe.Coerce"] = PS["Unsafe.Coerce"] || {});
(function(exports) {
  // Generated by psc version 0.7.0.0
  "use strict";
  var $foreign = PS["Main"];
  var Prelude = PS["Prelude"];
  var Node_ReadLine = PS["Node.ReadLine"];
  var Control_Monad_Eff_Random = PS["Control.Monad.Eff.Random"];
  var Control_Monad_Eff_Console = PS["Control.Monad.Eff.Console"];
  var Unsafe_Coerce = PS["Unsafe.Coerce"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];     
  var main = function __do() {
      var _1 = Node_ReadLine.createInterface(Node_ReadLine.noCompletion)();
      var _0 = Control_Monad_Eff_Random.randomInt(1)(100)();
      Node_ReadLine.prompt(_1)();
      return Prelude.flip(Node_ReadLine.setLineHandler)(_1)(function (guess) {
          return function __do() {
              Control_Monad_Eff_Console.log("You typed: " + guess)();
              var _4 = Prelude.compare(Prelude.ordInt)(Unsafe_Coerce.unsafeCoerce(guess))(_0);
              if (_4 instanceof Prelude.LT) {
                  Control_Monad_Eff_Console.log("Too small!")();
                  return Node_ReadLine.prompt(_1)();
              };
              if (_4 instanceof Prelude.GT) {
                  Control_Monad_Eff_Console.log("Too big!")();
                  return Node_ReadLine.prompt(_1)();
              };
              if (_4 instanceof Prelude.EQ) {
                  Control_Monad_Eff_Console.log("You win!")();
                  return $foreign.closeInterface(_1)();
              };
              throw new Error("Failed pattern match at /home/edwin/projects/something/purescript/src/Main.purs line 13, column 1 - line 29, column 26: " + [ _4.constructor.name ]);
          };
      })();
  };
  exports["main"] = main;
  exports["closeInterface"] = $foreign.closeInterface;;
 
})(PS["Main"] = PS["Main"] || {});

PS["Main"].main();

}).call(this,require('_process'))
},{"_process":2,"readline":1}]},{},[3]);
