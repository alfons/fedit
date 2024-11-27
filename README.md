# File Management with Tauri 2.0 Using Rust
When using **Tauri 2.0**, for security reasons, the app does not have access to files but requires the use of its `fs` API or Rust's `std::fs` module. I have struggled to get the `fs` API to work so this project is meant to explore.

The solution:
+ Correct imports in javascript.
+ Correct permissions in the tauri-conf.json.
+ Do not trust AI. Read the docs and reasonably mess with the code yourself.

![alt text](image.png)

Run the app:
```
npm run tauri dev
```