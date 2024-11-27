import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import './editor.css';

function Editor() {
    const [content, setContent] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleOpen = () => {
        // TODO: Implement open functionality
        console.log('Open button clicked');
    };

    const handleSave = async () => {
        try {
            // Save to a fixed path for testing
            await invoke('save_file', {
                content: content,
                path: "test.txt"  // This will save in the app's current directory
            });
            alert('File saved successfully!');
        } catch (error) {
            console.error('Error saving file:', error);
            alert('Failed to save file: ' + error);
        }
    };

    return (
        <div className="editor-container">
            <div className="button-container">
                <button onClick={handleOpen}>Open</button>
                <button onClick={handleSave}>Save</button>
            </div>
            <textarea
                className="editor-textarea"
                value={content}
                onChange={handleContentChange}
                placeholder="Type your text here..."
            />
        </div>
    );
}

export default Editor;
