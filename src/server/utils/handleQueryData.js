const collectCartData = ( obj ) => {
  const {id , quantity , createdAt , updatedAt } =obj.dataValues
  const { type , discountPercentage , price ,titleAr , titleEn , descriptionAr , descriptionEn , image} = obj.Item

  const collectedObj = {id , quantity ,  type , discountPercentage , price ,titleAr , titleEn , descriptionAr , descriptionEn , image , createdAt , updatedAt  }
  obj.Item.Package && ( collectedObj.period = obj.Item.Package.dataValues.period);
  obj.Item.Product && ( collectedObj.shippingPrice = obj.Item.Product.dataValues.shippingPrice);
  return collectedObj
}

const handleClientOrderData = (obj) => {
    const {
      id,
      state,
      dietPlanAr,
      dietPlanEn,
      supplementsAr,
      supplementsEn,
      trainingAr,
      trainingEn,
      itemOrderId,
      createdAt,
      updatedAt,
    } = obj.dataValues;
  
    const quantity = obj.dataValues.ItemOrder.dataValues.quantity;
    const isPaid = obj.dataValues.ItemOrder.dataValues.Order.dataValues.isPaid;
    const Item  = obj.dataValues.ItemOrder.dataValues.Item
  
  
    return {
      id,
      state,
      dietPlanAr,
      dietPlanEn,
      supplementsAr,
      supplementsEn,
      trainingAr,
      trainingEn,
      itemOrderId,
      createdAt,
      updatedAt,
      quantity,
      isPaid,
      Item
    };
  };

  const handleAdminOrderData = (obj) => {
    const {
        id,
        clientId,
        isPaid,
        totalPrice,
        createdAt,
        updatedAt,
    } = obj.dataValues;

    const {goal,tall,weight, } =  obj.dataValues.Client.dataValues
    const { name, email,  image:clientImg, phone,} = obj.dataValues.Client.dataValues.Person.dataValues
   

    const itemOrders = obj.dataValues.ItemOrders.map((item)=>{
        const {quantity} = item.dataValues;
        const {
            type ,
            discountPercentage ,
            price ,
            titleAr ,
            titleEn ,
            descriptionAr ,
            descriptionEn ,
            image ,
        
        } = item.dataValues.Item;

        return{
            quantity,
            type ,
            discountPercentage ,
            price ,
            titleAr ,
            titleEn ,
            descriptionAr ,
            descriptionEn ,
            image ,
            client:{
              name,
              email,
               image:clientImg,
              phone,
              goal,
              tall,
              weight
            }
        }
    })


  
  
    return {
        id,
        clientId,
        isPaid,
        totalPrice,
        createdAt,
        updatedAt,
        itemOrders
    };
  };

  const handleGetOrderTypesData = (obj , orderType ) => {
    const orderTypeData = {}
    console.log('obj' ,obj)
    if(orderType=="package"){
      orderTypeData.dietPlanAr = obj.dataValues.dietPlanAr
      orderTypeData.dietPlanEn = obj.dataValues.dietPlanEn
      orderTypeData.supplementsAr = obj.dataValues.supplementsAr
      orderTypeData.supplementsEn = obj.dataValues.supplementsEn
      orderTypeData.trainingAr = obj.dataValues.trainingAr
      orderTypeData.trainingEn = obj.dataValues.trainingEn
      orderTypeData.orderType = "package"
    }else{
      orderTypeData.orderType = "product"
    
    }
     const { id,state,itemOrderId,createdAt,updatedAt,} = obj.dataValues
     const { quantity } = obj.dataValues.ItemOrder.dataValues;
     const {type,discountPercentage,price,titleAr,titleEn, descriptionAr,descriptionEn,image, } = obj.dataValues.ItemOrder.dataValues.Item.dataValues;
    const {  isPaid, totalPrice } = obj.dataValues.ItemOrder.dataValues.Order.dataValues;
    const {goal,tall,weight, } =  obj.dataValues.ItemOrder.dataValues.Order.dataValues.Client.dataValues
     const { name, email,  image:clientImg, phone,} = obj.dataValues.ItemOrder.dataValues.Order.dataValues.Client.dataValues.Person.dataValues
    
    
      return{   
        id,
        state,
        itemOrderId,
        ...orderTypeData,
        createdAt,
        updatedAt,
        type,
        discountPercentage,
        price,
        titleAr,
        titleEn, 
        descriptionAr,
        descriptionEn,
        quantity,
        image,
        isPaid,
        totalPrice,
      
      client:{
        name,
        email,
         image:clientImg,
        phone,
        goal,
        tall,
        weight
      }
      }
  }
module.exports = { handleClientOrderData , handleAdminOrderData , handleGetOrderTypesData , collectCartData   }
