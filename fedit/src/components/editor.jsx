import { useState } from 'react';
import { invoke } from "@tauri-apps/api/core";
import { open, save } from '@tauri-apps/plugin-dialog';
import './editor.css';

function Editor() {
    const [content, setContent] = useState('');

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleOpen = async () => {
        try {
            // Open a file selection dialog
            const selected = await open({
                multiple: false,
                filters: [{
                    name: 'Text',
                    extensions: ['md', 'txt']
                }]
            });
            
            if (selected) {
                // Read the file content using our Rust command
                const fileContent = await invoke('open_file', {
                    path: selected
                });
                setContent(fileContent);
                console.log('File opened successfully!');
            }
        } catch (error) {
            console.error('Error opening file:', error);
        }
    };

    const handleSave = async () => {
        try {
            // Open a file save dialog window to select the file path
            const filePath = await save({
                filters: [{
                    name: 'Text',
                    extensions: ['md', 'txt']
                }]
            });
            
            // If the user selects a file path, save the file
            if (filePath) {
                // Save the file using our Rust command
                await invoke('save_file', {
                    content: content,
                    path: filePath
                });
                console.log('File saved successfully!');
            }
        } catch (error) {
            console.error('Error saving file:', error);
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
