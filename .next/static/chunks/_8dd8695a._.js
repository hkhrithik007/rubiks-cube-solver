(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/RubiksCube.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RubiksCube": (()=>RubiksCube)
});
class RubiksCube {
    faces;
    scrambleMoves = [];
    constructor(){
        // Initialize a solved cube
        this.faces = {
            U: Array(9).fill('y'),
            D: Array(9).fill('w'),
            F: Array(9).fill('r'),
            B: Array(9).fill('o'),
            L: Array(9).fill('g'),
            R: Array(9).fill('b')
        };
    }
    rotateArray(arr, direction) {
        const result = [
            ...arr
        ];
        if (direction === 'clockwise') {
            // For clockwise rotation: [0,1,2,3,4,5,6,7,8] -> [6,3,0,7,4,1,8,5,2]
            [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [
                result[6],
                result[3],
                result[0],
                result[7],
                result[4],
                result[1],
                result[8],
                result[5],
                result[2]
            ];
        } else {
            // For counterclockwise rotation: [0,1,2,3,4,5,6,7,8] -> [2,5,8,1,4,7,0,3,6]
            [result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8]] = [
                result[2],
                result[5],
                result[8],
                result[1],
                result[4],
                result[7],
                result[0],
                result[3],
                result[6]
            ];
        }
        return result;
    }
    updateAdjacentFaces(face, direction) {
        const adjacency = {
            U: {
                faces: [
                    'F',
                    'R',
                    'B',
                    'L'
                ],
                indices: [
                    [
                        0,
                        1,
                        2
                    ],
                    [
                        0,
                        1,
                        2
                    ],
                    [
                        0,
                        1,
                        2
                    ],
                    [
                        0,
                        1,
                        2
                    ]
                ]
            },
            D: {
                faces: [
                    'F',
                    'L',
                    'B',
                    'R'
                ],
                indices: [
                    [
                        6,
                        7,
                        8
                    ],
                    [
                        6,
                        7,
                        8
                    ],
                    [
                        6,
                        7,
                        8
                    ],
                    [
                        6,
                        7,
                        8
                    ]
                ]
            },
            F: {
                faces: [
                    'U',
                    'R',
                    'D',
                    'L'
                ],
                indices: [
                    [
                        6,
                        7,
                        8
                    ],
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        2,
                        1,
                        0
                    ],
                    [
                        8,
                        5,
                        2
                    ]
                ]
            },
            B: {
                faces: [
                    'U',
                    'L',
                    'D',
                    'R'
                ],
                indices: [
                    [
                        0,
                        1,
                        2
                    ],
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        8,
                        7,
                        6
                    ],
                    [
                        8,
                        5,
                        2
                    ]
                ]
            },
            L: {
                faces: [
                    'U',
                    'F',
                    'D',
                    'B'
                ],
                indices: [
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        8,
                        5,
                        2
                    ]
                ]
            },
            R: {
                faces: [
                    'U',
                    'B',
                    'D',
                    'F'
                ],
                indices: [
                    [
                        8,
                        5,
                        2
                    ],
                    [
                        0,
                        3,
                        6
                    ],
                    [
                        8,
                        5,
                        2
                    ],
                    [
                        8,
                        5,
                        2
                    ]
                ]
            }
        };
        const adj = adjacency[face];
        if (!adj) return;
        const { faces, indices } = adj;
        const values = faces.map((f, i)=>indices[i].map((idx)=>this.faces[f][idx]));
        if (direction === 'clockwise') {
            values.unshift(values.pop());
        } else {
            values.push(values.shift());
        }
        faces.forEach((f, i)=>{
            indices[i].forEach((idx, j)=>{
                this.faces[f][idx] = values[i][j];
            });
        });
    }
    rotate(face, direction) {
        if (!this.faces[face]) {
            throw new Error(`Invalid face: ${face}`);
        }
        this.faces[face] = this.rotateArray(this.faces[face], direction);
        this.updateAdjacentFaces(face, direction);
    }
    scramble(movesCount = 20) {
        const faces = [
            'U',
            'D',
            'F',
            'B',
            'L',
            'R'
        ];
        const directions = [
            'clockwise',
            'counterclockwise'
        ];
        this.scrambleMoves = [];
        for(let i = 0; i < movesCount; i++){
            const face = faces[Math.floor(Math.random() * faces.length)];
            const direction = directions[Math.floor(Math.random() * directions.length)];
            this.rotate(face, direction);
            this.scrambleMoves.push({
                face,
                direction
            });
        }
    }
    getScrambleMoves() {
        return [
            ...this.scrambleMoves
        ];
    }
    isSolved() {
        return Object.values(this.faces).every((face)=>face.every((color)=>color === face[0]));
    }
    getStateString() {
        // Returns the cube state in the format expected by getCubeSvg()
        // Order: Up, Right, Front, Down, Left, Back
        return [
            ...this.faces['U'],
            ...this.faces['R'],
            ...this.faces['F'],
            ...this.faces['D'],
            ...this.faces['L'],
            ...this.faces['B']
        ].join('');
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/RubiksCubeSolver.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "RubiksCubeSolver": (()=>RubiksCubeSolver)
});
class RubiksCubeSolver {
    solve(cube) {
        if (!cube) {
            throw new Error('Invalid cube provided');
        }
        if (cube.isSolved()) {
            return [];
        }
        const solution = [];
        const scrambleMoves = cube.getScrambleMoves();
        // Simple solver: reverse the scramble moves
        for(let i = scrambleMoves.length - 1; i >= 0; i--){
            const move = scrambleMoves[i];
            const reverseDirection = move.direction === 'clockwise' ? 'counterclockwise' : 'clockwise';
            cube.rotate(move.face, reverseDirection);
            solution.push({
                move: `${move.face} ${reverseDirection}`,
                state: cube.getStateString()
            });
        }
        return solution;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/cubeUtils.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "getCubeSvg": (()=>getCubeSvg)
});
function getCubeSvg(state) {
    // Validate input
    if (!state || state.length !== 54) {
        throw new Error('Invalid cube state: must be a string of length 54');
    }
    const colorMap = {
        'r': '#FF0000',
        'g': '#00FF00',
        'b': '#0000FF',
        'y': '#FFFF00',
        'o': '#FFA500',
        'w': '#FFFFFF'
    };
    // Create SVG for a single face
    const createFace = (startIndex, x, y, size)=>{
        const squares = [];
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const color = colorMap[state[startIndex + i * 3 + j]] || '#CCCCCC';
                squares.push(`
          <rect
            x="${x + j * (size / 3)}"
            y="${y + i * (size / 3)}"
            width="${size / 3}"
            height="${size / 3}"
            fill="${color}"
            stroke="black"
            stroke-width="1"
          />
        `);
            }
        }
        return squares.join('');
    };
    // Layout configuration for the faces
    // Order: Up(0), Right(9), Front(18), Down(27), Left(36), Back(45)
    const faceLayout = [
        {
            startIndex: 0,
            x: 100,
            y: 0
        },
        {
            startIndex: 9,
            x: 200,
            y: 100
        },
        {
            startIndex: 18,
            x: 100,
            y: 100
        },
        {
            startIndex: 27,
            x: 100,
            y: 200
        },
        {
            startIndex: 36,
            x: 0,
            y: 100
        },
        {
            startIndex: 45,
            x: 300,
            y: 100
        }
    ];
    const size = 100; // Size of each face
    const faces = faceLayout.map((face)=>createFace(face.startIndex, face.x, face.y, size)).join('');
    return `
    <svg 
      viewBox="-10 -10 420 320" 
      width="100%" 
      height="100%" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="-10" y="-10" width="420" height="320" fill="#f8f8f8" />
      ${faces}
    </svg>
  `;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/test/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TestPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$RubiksCube$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/RubiksCube.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$RubiksCubeSolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/RubiksCubeSolver.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cubeUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cubeUtils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TestPage() {
    _s();
    const [cube, setCube] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TestPage.useState": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$RubiksCube$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RubiksCube"]()
    }["TestPage.useState"]);
    const [currentState, setCurrentState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(cube.getStateString());
    const [solutionSteps, setSolutionSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleScramble = ()=>{
        console.log('Scramble clicked!');
        setMessage('Scrambling...');
        const newCube = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$RubiksCube$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RubiksCube"]();
        newCube.scramble(10);
        setCube(newCube);
        setCurrentState(newCube.getStateString());
        setSolutionSteps([]);
        setMessage('Cube scrambled!');
    };
    const handleSolve = async ()=>{
        console.log('Solve clicked!');
        setMessage('Solving...');
        const solver = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$RubiksCubeSolver$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RubiksCubeSolver"]();
        const solution = solver.solve(cube);
        if (solution.length === 0) {
            setMessage('Cube is already solved!');
            return;
        }
        setSolutionSteps(solution);
        // Animate through solution
        for(let i = 0; i < solution.length; i++){
            setCurrentState(solution[i].state);
            setMessage(`Step ${i + 1}/${solution.length}: ${solution[i].move}`);
            await new Promise((resolve)=>setTimeout(resolve, 500));
        }
        setMessage('Cube solved!');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold text-center mb-8",
                    children: "Rubik's Cube Test"
                }, void 0, false, {
                    fileName: "[project]/src/app/test/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-8 rounded-lg shadow-lg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center mb-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                dangerouslySetInnerHTML: {
                                    __html: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cubeUtils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCubeSvg"])(currentState)
                                },
                                className: "w-96 h-96"
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 55,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/test/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-semibold",
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/src/app/test/page.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/test/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 justify-center mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleScramble,
                                    className: "bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-xl font-bold rounded-lg",
                                    children: "Scramble"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/test/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSolve,
                                    className: "bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-xl font-bold rounded-lg",
                                    children: "Solve"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/test/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/test/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "max-h-64 overflow-y-auto",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-semibold mb-2",
                                    children: "Solution Steps:"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/test/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                solutionSteps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-2 bg-gray-100 rounded mb-1",
                                        children: [
                                            index + 1,
                                            ". ",
                                            step.move
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/src/app/test/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/test/page.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/test/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/test/page.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/test/page.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(TestPage, "g2sufmMNRfZMOZoAMZMAxjyWaGE=");
_c = TestPage;
var _c;
__turbopack_context__.k.register(_c, "TestPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_8dd8695a._.js.map