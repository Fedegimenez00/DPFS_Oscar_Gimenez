const defaultImagePreview = '/imgs/Images/photo preview.webp';
const imageFile = document.getElementById('courseimage');

const imagePreview = document.getElementById('imgPreview')
imageFile.addEventListener('change', e  =>{
    if( e.target.files[0] ){
        const reader = new FileReader( );
        reader.onload = function( e ) {
            imagePreview.src = e.target.result;
        }
        reader.readAsDataURL(e.target.files[0])
    }else{
        imagePreview.src = defaultImagePreview;
    };
    
})