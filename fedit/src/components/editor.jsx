import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { getCurrentWindow } from '@tauri-apps/api/window';
import './editor.css';

function Editor() {
  const [content, setContent] = useState('');
  const [currentPath, setCurrentPath] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const [savedContent, setSavedContent] = useState('');
  const appName = 'fedit';

  // THIS IS THE ONLY PART THAT CHANGED
  useEffect(() => {
    const updateTitle = async () => {
      const fileName = currentPath ? currentPath.split('/').pop() : 'Untitled';
      const dirtyMark = isDirty ? '*' : '';
      await (await getCurrentWindow()).setTitle(`${fileName}${dirtyMark} — ${appName}`);
    };
    updateTitle();
  }, [currentPath, isDirty]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setIsDirty(newContent !== savedContent);
  };

  const handleOpen = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [{ name: 'Text', extensions: ['md', 'txt'] }],
      });
      if (selected) {
        const fileContent = await invoke('open_file', { path: selected });
        setContent(fileContent);
        setSavedContent(fileContent);
        setCurrentPath(selected);
        setIsDirty(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (forceDialog = false) => {
    try {
      let filePath = currentPath;
      if (!filePath || forceDialog) {
        filePath = await save({
          filters: [{ name: 'Text', extensions: ['md', 'txt'] }],
        });
      }
      if (!filePath) return;

      await invoke('save_file', { content, path: filePath });
      setCurrentPath(filePath);
      setSavedContent(content);
      setIsDirty(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="editor-container">
      <div className="button-container">
        <button onClick={handleOpen}>Open</button>
        <button onClick={() => handleSave()} disabled={!currentPath && !isDirty}>
          Save
        </button>
        <button onClick={() => handleSave(true)}>Save as…</button>
      </div>

      <textarea
        className="editor-textarea"
        value={content}
        onChange={handleContentChange}
        placeholder="Open a file or start typing..."
        spellCheck={false}
      />

      {currentPath && <div className="file-path">{currentPath}</div>}
    </div>
  );
}

export default Editor;
