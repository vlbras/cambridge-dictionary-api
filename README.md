# cambridge-dictionary-api

[![npm](https://img.shields.io/npm/v/cambridge-dictionary-api.svg)](https://www.npmjs.com/package/cambridge-dictionary-api)
[![license](https://img.shields.io/github/license/vlbras/cambridge-dictionary-api.svg)](https://www.npmjs.com/package/cambridge-dictionary-api)
[![npm downloads](https://img.shields.io/npm/dt/cambridge-dictionary-api.svg)](https://www.npmjs.com/package/cambridge-dictionary-api)

## Description

A powerful yet lightweight Node.js package for fetching word definitions, pronunciations and usage examples from the Cambridge Dictionary. Perfect for language learning apps, AI-driven assistants, and NLP projects.

## Installation

```bash
npm install cambridge-dictionary-api
```

## Usage

```ts
import { fetchDictionaryWord } from 'cambridge-dictionary-api';

const result = await fetchDictionaryWord('abandon');
console.log(result);
```

## 📖 Example

```json
{
  "word": "abandon",
  "dialects": {
    "us": {
      "audio": "https://dictionary.cambridge.org/us/media/english/us_pron/a/aba/aband/abandon.mp3",
      "phonetic": "/əˈbæn.dən/"
    },
    "uk": {
      "audio": "https://dictionary.cambridge.org/us/media/english/uk_pron/u/uka/uka__/uka____013.mp3",
      "phonetic": "/əˈbæn.dən/"
    }
  },
  "definitions": [
    {
      "definition": "to leave a place, thing, or person, usually forever:",
      "partOfSpeech": "verb",
      "level": "B2",
      "examples": [
        "We had to abandon the car.",
        "By the time the rebel troops arrived, the village had already been abandoned.",
        "As a baby he was abandoned by his mother.",
        "We were sinking fast, and the captain gave the order to abandon ship."
      ]
    },
    {
      "definition": "to stop doing an activity before you have finished it:",
      "partOfSpeech": "verb",
      "level": "C1",
      "examples": [
        "The game was abandoned at halftime because of the poor weather conditions.",
        "They had to abandon their attempt to climb the mountain.",
        "The party has now abandoned its policy of unilateral disarmament."
      ]
    }
  ]
}
```

## Author

**Vladyslav Braslavskyi [GitHub](https://github.com/vlbras)**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.