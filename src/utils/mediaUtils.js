const checkFile = (file) => {

   const LIMIT = 200 * (2 ** 20)
   if(file.size > LIMIT){
      return false;
   }
   const type = file.type;
   //tipos de archivo admitidos
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

export {checkFile}