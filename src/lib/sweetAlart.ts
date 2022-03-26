import Swal from 'sweetalert2';

export const sweetConfirmation = (callBackFn: Function, confirmButtonText:string, text:string = '') => {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
   title: 'Are you sure?',
   text: text,
   icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmButtonText, //'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    reverseButtons: true
  }).then( async(result) => {
    console.log('result', result);
    if (result.isConfirmed) {
      await callBackFn();
      // const { status, msg} = await deleteService();
      // if (status) {
      //   swalWithBootstrapButtons.fire( 'Deleted!', msg, 'success' );
      // }
      // else{
      //   swalWithBootstrapButtons.fire( 'Error!', msg, 'error' );
      // }
    }
    // else if (
    //   /* Read more about handling dismissals below */
    //   result.dismiss === Swal.DismissReason.cancel
    // ) {
    //   swalWithBootstrapButtons.fire( '', 'Cancelled :)', 'error' );
    // }
  });
}
