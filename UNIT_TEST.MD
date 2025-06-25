# UNIT TEST

1. Install module
`
pnpm add  --save-dev jest ts-jest @types/jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom ts-node
`

2. Add test folder with content
include": ["src", "test"],
3. update tsconfig.app.json
"types": ["@testing-library/jest-dom", "node"]
4. create jest.config.ts and update the same