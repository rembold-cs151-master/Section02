/*
 * File: HailstoneTrace.js
 * -----------------------
 * This file traces the Hailstone problem from section.
 */

"use strict";

function HailstoneDemo() {
    new HailstoneTrace();
}

class HailstoneTrace extends CodeTrace {

    constructor() {
        super("HailstoneTrace");
        this.reset();
    }

    setParameters() {
        this.setMaxStackDepth(2);
        this.setFrameHeight(HailstoneTrace.FRAME_HEIGHT);
        this.setFrameDeltas(HailstoneTrace.FRAME_DX, HailstoneTrace.FRAME_DY);
        this.keepLastFrame(true);
    }

    defineFunctions() {
        this.defineFunction("main", new HailstoneMain(17));
        this.defineFunction("hailstone", new Hailstone());
    }

    reset() {
        let console = document.getElementById("HailstoneConsole");
        console.innerHTML = "";
        super.reset();
    }

    run() {
        this.call("main");
    }

}

HailstoneTrace.FRAME_HEIGHT = 510;
HailstoneTrace.FRAME_DX = 16;
HailstoneTrace.FRAME_DY = 62;
HailstoneTrace.VAR_WIDTH = 160;
HailstoneTrace.VAR_HEIGHT = 50;

class HailstoneMain extends CTFunction {

    constructor(n) {
        super(HailstoneMain.HTML.replace("{n}", "" + n));
        this._n = n;
    }

    createFrame(ct) {
        return new CTStackFrame(ct, this);
    }
    
    async run(ct) {
        let cf = ct.getCurrentFrame();
        let n = this._n;
        return await ct.traceStep("#1",
                                  function() {
                                      cf.highlight(null);
                                      return ct.call("hailstone", n);
                                  });
    }

}

HailstoneMain.CODE = [
    ">>> hailstone({n})"
];

HailstoneMain.HTML =
    "<span class='prompt'>&gt;&gt;&gt;</span> " +
        "<span class='#1'>hailstone({n})</span>\n";

class Hailstone extends CTFunction {

    constructor() {
        super(Hailstone.HTML);
    }

    createFrame(ct) {
        let cf = new CTStackFrame(ct, this);
        cf.addVariable("n", HailstoneTrace.VAR_WIDTH,
                            HailstoneTrace.VAR_HEIGHT);
        cf.addVariable("steps", HailstoneTrace.VAR_WIDTH,
                                HailstoneTrace.VAR_HEIGHT);
        cf.layoutVariables();
        cf.set("n", ct.pop());
        return cf;
    }
    
    async run(ct) {
        let cf = ct.getCurrentFrame();
        let n = cf.get("n");
        let steps = 0;
        await ct.traceStep("#1", function() {
                                     cf.set("steps", 0);
                                     steps = 0;
                                 });
        await ct.traceStep("#2", () => undefined);
        while (await ct.traceStep("#2a", () => n !== 1)) {
            if (await ct.traceStep("#3", () => n % 2 === 0)) {
                await ct.traceStep("#4",
                    function() {
                        print(n + " is even, so I take half: " + (n / 2));
                    });
                await ct.traceStep("#5", () => cf.set("n", n = n / 2));
            } else {
                await ct.traceStep("#6",
                    function() {
                        print(n + " is odd, so I make 3n+1: " + (3 * n + 1));
                    });
                await ct.traceStep("#7", () => cf.set("n", n = 3 * n + 1));
            }
            await ct.traceStep("#8", () => cf.set("steps", ++steps));
        }
        await ct.traceStep("#9",
            function() {
                print("The process took " + steps + " steps to reach 1.");
            });
        await ct.traceStep("#9", () => undefined);

        function print(s) {
            let console = document.getElementById("HailstoneConsole");
            console.innerHTML += s + "<br />";
            console.scrollTop = console.scrollHeight;
        }

    }

}

Hailstone.HTML =
    "<span class='skeyword'>def</span> <span class='funcname'>hailstone</span>(<span class='params'>n</span>):\n" +
    "    <span class='#1'>steps = 0</span>\n" +
    "    <span class='#2'><span class='keyword'>while</span> "+
         "<span class='#2a'>n != 1</span>:</span>\n" +
    "        <span class='#3'><span class='keyword'>if</span> " +
         "n % 2 == 0:</span>\n" +
    "            <span class='#4'><span class='builtin'>print</span>" +
         "(<span class='strlit'>f\"{n} is even, so I take half: " +
         "{n // 2}\"</span>)</span>\n" + 
    "            <span class='#5'>n = n // 2</span>\n" +
    "        <span class='keyword'>else</span>:\n" +
    "            <span class='#6'><span class='builtin'>print</span>" +
         "(<span class='strlit'>f\"{n} is odd, so I make 3n+1: " +
         "{3 * n + 1}\"</span>)</span>\n" + 
    "            <span class='#7'>n = 3 * n + 1</span>\n" +
    "        <span class='#8'>steps += 1</span>\n" +
    "    <span class='#9'><class='builtin'>print</span>" +
         "(<span class='strlit'>f\"The process took {steps} steps " +
         "to reach 1.\"</span>)</span>\n";
