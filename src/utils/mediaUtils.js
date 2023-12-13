const getFileType = (file) => {
    const type = file.type;
    console.log(file.type)
    // Lista de tipos MIME comunes para imágenes y videos
    const tiposImagen = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
    const tiposVideo = ['video/mp4', 'video/webm', 'video/ogg'];
  
     if (!tiposImagen.includes(type) && !tiposVideo.includes(type)){
        return false;
     }
     if (tiposImagen.includes(type)){
        return 'image';
     }
     else{
        return 'video'
     }
}

export {getFileType}