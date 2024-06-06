//this make public so that views can use accessed this file

function deleteProduct(id)
{
    const result=confirm("Are you sure you want to delete this product ?");
    if(result)
        {
            fetch('/delete-product/'+id,
            {
                method:'POST',
            }).then((res)=>{
                if(res.ok)
                    {
                        //for refresh the page
                        location.reload();
                        // OR
                        //window.location.href="/";
                    }
            });
        }
}
