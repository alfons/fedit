# FMAN
Basic file management with Rust to be used in Tauri 2.0.

When using Tauri 2.0, for security reasons, the app does not have access to files but requires the use of its `fs` API or Rust's `std::fs` module. I have struggled to get the `fs` API to work so this project is meant to explore.

## Installation

1. Initialize the project:
```
npm create tauri-app@latest
```

2. Install dependencies:
```
cd fedit
npm install
```

3. Run the app:
```
npm run tauri dev
```




## TODO
+ [ ] Create a simple text input component
+ [ ] Create a open file dialog component
+ [ ] Create a save file dialog component
+ [ ] Implement the create/write/save file functions
+ [ ] Implement the read file function

