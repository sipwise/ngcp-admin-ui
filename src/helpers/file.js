export function fileToBase64 (file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
            resolve(reader.result.split(';base64,')[1])
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export function createEmptyTxtFile (title) {
    return new File([], title || 'empty.txt', { type: 'text/plain', lastModified: new Date().getTime() })
}
