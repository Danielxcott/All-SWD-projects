       function tosubr(x,max=100){
            if(x.length>max){
                return x.substring(0,max)+"..."
            }
            return x
        }

        let products=[];
        
        function toShow(x){
            $("#products").empty();
            x.map(function(product){
                $("#products").append(`
                <div class="product card pt-5 ">
                <img src="${product.image} " class="card-img-top" alt="">
                <div class="card-body border rounded">
                    <p class="card-title font-weight-bold">
                        ${product.title}
                        </p>
                    <small class="card-black-50">
                        ${tosubr(product.description,120)}
                        </small>
                    <div class="d-flex justify-content-between align-items-end">
                        <span class="font-weight-bold">
                            $ ${product.price}
                            </span>
                        <button class=" btn btn-sm btn-outline-primary add-to-cart" data-id="${product.id}">
                            Add <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
                `)
            })
        }
        function toCalc(){
        let count = $(".cart-cost").length;
        $(".cart-count").html(count)
        // console.log(count)
        if(count>0){
            $(".cart-count").html($(".cart-cost").length)
        console.log($(".cart-cost"))
        let total = $(".cart-cost").toArray().map(el=>el.innerHTML).reduce((x,y)=>Number(x)+Number(y));
        $(".total").html(` <span class="font-weight-bold">Total</span>
        <span class="cost-total" style="padding:0px 16px">$ ${Number(total).toFixed(2)}</span>`)
        }else{
            $(".total").html("empty cart")
        }
        


    }
        $.get("https://fakestoreapi.com/products",function(data){
            console.log(data)
           products  = data;
           toShow(products);
        })
        $("#search").on("keyup",function(){
            let keyword = $(this).val().toLowerCase();
            console.log(keyword);
            if(keyword.trim().length){
                let filterProduct = products.filter(el=>{
                    if(el.title.toLowerCase().indexOf(keyword)>-1|| el.description.toLowerCase().indexOf(keyword)>-1||el.price === keyword){
                        return el;
                    }
                })
                toShow(filterProduct);
            }
        })

        $.get("https://fakestoreapi.com/products/categories",function (data) {
        data.map(el => $("#select").append(`<option value="${el}">${el}</option>`))
    })

    $("#select").on("change",function () {

        let selectedCategory = $(this).val();
        console.log(typeof selectedCategory);

        if(selectedCategory != 0){
            let filterProducts = products.filter(product=>{
                if(product.category === selectedCategory){
                    return product;
                }
            })

            toShow(filterProducts);
        }else{
            toShow(products);
        }
    })
   

    $("#products").delegate(".add-to-cart","click",function(){
        let currentId = $(this).attr("data-id");
        console.log(currentId)
        let productInfo = products.filter(el=>el.id == currentId)[0]
        console.log(productInfo);
        if($(".item-cart").toArray().map(el=>el.getAttribute("data-id")).includes(currentId)){
            alert("already added")
        }else{
            $("#cart").append(` 
            <div class="card item-cart border-0" data-id="${productInfo.id}">
            <div class="card-body d-flex justify-content-between align-content-end">
            <img src="${productInfo.image}" class="img-cart" alt="">
                <button class="btn btn-outline-danger
                delete-cart">
                <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <p class="mt-3">${productInfo.title}</p>
            <div class="d-flex justify-content-between align-items-end">
            <div class="form-row">
                <button class="btn btn-outline-primary minus-cart" style="margin-left:5px">
                    <i class="fas fa-minus"></i>
                </button>
                <input type="number"  unitPrice=${productInfo.price} value="1" min="1" class="form-control quantity w-25 mx-2">
                <button class="btn btn-outline-primary plus-cart">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <p class="mb-0" style="width:120px;">$ <span class="cart-cost px-2 py-3">${productInfo.price}</span></p>
            </div>
            <hr>
             </div>
        </div>
            `)
        }
        toCalc();

    });
    $("#cart").delegate(".delete-cart","click",function(){
        $(this).parentsUntil("#cart").remove();
        toCalc();
    })
    $("#cart").delegate(".plus-cart","click",function(){
        let x= $(this).siblings(".quantity").val();
        let y = $(this).siblings(".quantity").attr("unitPrice");
        console.log(y)
        let first = Number(x)+1
        let sec = y * first;
        $(this).siblings(".quantity").val(first);
        $(this).parent().siblings("p").find(".cart-cost").html(sec.toFixed(2));
        toCalc();
        
    })

$("#cart").delegate(".minus-cart","click",function(){
    let x = $(this).siblings(".quantity").val();
    console.log(x)
    let y = $(this).siblings(".quantity").attr("unitPrice");
    console.log(y)
    if(x>1){
        let first = Number(x)-1;
        let sec = y * first;
        $(this).siblings(".quantity").val(first);
        $(this).parent().siblings("p").find(".cart-cost").html(sec.toFixed(2));
        toCalc();
    }
    

})
$("#cart").delegate(".quantity","keyup change",function(){
    let x = $(this).val();
    console.log(x)
    let y = $(this).attr("unitPrice");
    if(x>1){
        let first = Number(x);
        let sec = y * first;
        $(this).val(first);
        $(this).parent().siblings("p").find(".cart-cost").html(sec.toFixed(2));
        toCalc();
    }else{
        alert("You can't type less than 1")

    }
})
