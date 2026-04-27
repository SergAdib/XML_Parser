// // jest.config.js
// module.exports = {
//   transform: {
//     '^.+\\.(ts|tsx)$': 'babel-jest', // or 'ts-jest'
//   },
//     "transformIgnorePatterns": [
//     "node_modules/(?!(react-test-renderer)/)"
//   ]
// };

module.exports = {  
  transformIgnorePatterns: ['node_modules/(?!(sucrase)/)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },  
}