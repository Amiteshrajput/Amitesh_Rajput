{editPhoto?
    <div style={{display:"flex",width:"80%",margin:"auto"}}>
      <input type="file"  accept='.gif, .jpg, .png' onChange={e=>setPhotoGalleryFile(e)}/>
      <Button startIcon={<CameraAltIcon />} variant="contained" size="small" onClick={()=>
        submitFile(photogalleryFile,'photogallery',item.id)}>Upload</Button>
    </div>:
    <Button size="small"   variant="contained" onClick={()=>{setEditPhoto(true);
    editDeleteImage(item.src,item.fileRef,item.id)}}>Edit</Button>}