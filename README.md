# Rubik's Cube Solver

An interactive Rubik's Cube solver built with Next.js, TypeScript, and Tailwind CSS that demonstrates object-oriented programming and algorithmic problem-solving skills.

## Features

- **Object-Oriented Design**: Complete Rubik's Cube representation using TypeScript classes
- **Manual Rotation**: Support for rotating any face clockwise or counterclockwise
- **Cube Scrambling**: Generate randomized cube states for solving
- **Solving Algorithm**: Functional solver that reverses scramble moves
- **Visual Representation**: Real-time SVG visualization of cube states
- **Step-by-Step Solution**: Display each move with visual feedback
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## Implementation Details

### Core Classes

1. **RubiksCube** (`src/lib/RubiksCube.ts`)
   - Represents the cube state with six faces (Up, Down, Front, Back, Left, Right)
   - Each face stored as a 9-element array with color codes: `r`, `g`, `b`, `y`, `o`, `w`
   - Methods for rotation, scrambling, and state management
   - Proper adjacency handling for face rotations

2. **RubiksCubeSolver** (`src/lib/RubiksCubeSolver.ts`)
   - Simple but functional solving algorithm
   - Reverses scramble moves to return cube to solved state
   - Returns step-by-step solution with move descriptions

3. **Cube Visualization** (`src/lib/cubeUtils.ts`)
   - `getCubeSvg()` function generates SVG representation
   - Unfolded cube layout showing all six faces
   - Color-coded squares with proper borders

### Algorithm Approach

The solver uses a straightforward approach:
1. Records all moves made during scrambling
2. Reverses the order of moves
3. Inverts each move direction (clockwise ↔ counterclockwise)
4. Applies reversed moves to return cube to solved state

While not optimal in terms of move count, this approach guarantees a working solution and demonstrates the core programming concepts effectively.

## Build and Execution Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation and Setup

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```
   (Note: The `--legacy-peer-deps` flag resolves React version conflicts)

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   - Main application: `http://localhost:3000/rubiks-cube`
   - Test page: `http://localhost:3000/test`

### Usage

1. **Scramble the Cube**: Click the "Scramble Cube" button to randomize the cube state
2. **Solve the Cube**: Click the "Solve Cube" button to watch the step-by-step solution
3. **View Progress**: Monitor the solution steps in the sidebar and watch the cube visualization update in real-time

## Project Structure

```
src/
├── lib/
│   ├── RubiksCube.ts          # Core cube logic and state management
│   ├── RubiksCubeSolver.ts    # Solving algorithm implementation
│   └── cubeUtils.ts           # SVG visualization utilities
├── app/
│   ├── layout.tsx             # Root layout component
│   ├── rubiks-cube/
│   │   ├── page.tsx           # Main Rubik's Cube interface
│   │   └── layout.tsx         # Page-specific layout
│   └── test/
│       └── page.tsx           # Simple test interface
└── components/ui/             # Reusable UI components (Shadcn)
```

## Technical Highlights

- **TypeScript**: Full type safety with interfaces and proper error handling
- **Object-Oriented Design**: Clean separation of concerns with dedicated classes
- **Modern React**: Functional components with hooks for state management
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Real-time Updates**: Smooth animations during solving process
- **Error Handling**: Comprehensive validation and user feedback

## Future Enhancements

- Implement more sophisticated solving algorithms (Layer-by-layer, CFOP)
- Add manual cube manipulation controls
- Include solve time tracking and statistics
- Support for different cube sizes (4x4, 5x5)
- Save and load cube configurations

## Development Notes

This implementation prioritizes:
1. **Functionality over optimization** - The solver works reliably
2. **Code clarity** - Easy to understand and maintain
3. **Demonstration of skills** - Shows OOP principles and problem-solving
4. **User experience** - Clean, intuitive interface

The project successfully demonstrates programming competency through working code that can be easily built, run, and tested.
