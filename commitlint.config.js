module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // Subject case should be lower case
    'subject-case': [2, 'always', 'lower-case'],
    // Header max length
    'header-max-length': [2, 'always', 100],
    // Subject max length
    'subject-max-length': [2, 'always', 72],
    // Subject should not be empty
    'subject-empty': [2, 'never'],
    // Subject should not end with period
    'subject-full-stop': [2, 'never', '.'],
    // Body should have leading blank line
    'body-leading-blank': [2, 'always'],
    // Footer should have leading blank line
    'footer-leading-blank': [2, 'always'],
    // Type should not be empty
    'type-empty': [2, 'never'],
    // Type should be lower case
    'type-case': [2, 'always', 'lower-case'],
    // Custom rule to prevent AI mentions
    'subject-no-ai-mention': [2, 'never'],
    'body-no-ai-mention': [2, 'never'],
  },
  plugins: [
    {
      rules: {
        'subject-no-ai-mention': parsed => {
          const aiPatterns = [
            /claude/i,
            /generated with/i,
            /co-authored-by.*claude/i,
            /🤖/,
            /anthropic/i,
          ];

          const subject = parsed.subject || '';
          for (const pattern of aiPatterns) {
            if (pattern.test(subject)) {
              return [false, 'Commit subject should not mention AI assistance'];
            }
          }
          return [true];
        },
        'body-no-ai-mention': parsed => {
          const aiPatterns = [
            /claude/i,
            /generated with/i,
            /co-authored-by.*claude/i,
            /🤖/,
            /anthropic/i,
          ];

          const body = parsed.body || '';
          for (const pattern of aiPatterns) {
            if (pattern.test(body)) {
              return [false, 'Commit body should not mention AI assistance'];
            }
          }
          return [true];
        },
      },
    },
  ],
};
