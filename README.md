# 檔案內容

```
╰─$ tree -I node_modules
.
├── package-lock.json
├── package.json
├── pages
│   ├── hello.js
│   ├── index.js
│   └── spellingCheck.js
└── yarn.lock
```

# 說明

hello page 是簡單的 React 程式範例. 
spellingCheck 是呼叫 Azure Spell Check API 的範例程式

index.js 目前是較用 spellingCheck 來顯示

# 已知問題

```
1. 檢查拼字正確與否, 目前是依照 Azure Spelling Check API 回傳值, 來判斷. 未必
   === (等於) '{"_type": "SpellCheck", "flaggedTokens": []}' 這個字串
```
