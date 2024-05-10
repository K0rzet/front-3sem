export default {
  // Настройка путей, где находятся ваши тестовые файлы
  roots: ["<rootDir>/src"],
  // Добавление расширений файлов для тестирования
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // Настройка тестового окружения (например, jsdom для тестирования React компонентов)
  testEnvironment: "jsdom",
  // Настройка пути к файлу, который будет выполняться перед запуском тестов
  setupFilesAfterEnv: ["<rootDir>/tests/setup.tsx"],
  // Настройка покрытия кода тестами
  collectCoverage: true,
  // Директория, где будут сохраняться отчеты о покрытии кода
  coverageDirectory: "coverage",
  // Подробные настройки для покрытия кода
  coverageReporters: ["json", "lcov", "text", "clover"],
  // Настройка пропуска некоторых файлов при тестировании
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};
