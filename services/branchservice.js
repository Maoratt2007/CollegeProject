const Branch=require('../modules/branch');
//add category for method post
const creatBranch=async (name,address,phoneNumber,activityTime,lng,lat,manager)=>{
    const branch =await Branch.create({
        name:name,
        address:address,
        phoneNumber:phoneNumber,
        activityTime:activityTime,
        lng:lng,
        lat:lat,
        manager
    });
    return branch

}
//find by id 
const findBranchById= async(_id)=>{
    return await Branch.findById(_id);
}
//get all
const getBranches= async()=>{
    return await Branch.find({});
}
//update
const updateBranch=async(_id,name,address,phoneNumber,activityTime,lng,lat, manager)=>{
    const branch=await findCategoryById(_id);
    if(!branch)
    {
        return null;
    }
    branch.name=name;
    branch.address=address;
    branch.phoneNumber=phoneNumber;
    branch.activityTime=activityTime;
    branch.lng=lng;
    branch.lat=lat;
    branch.manager= manager;
    return await branch.save();
}
//delete
const deleteBranch=async(_id)=>{
    const branch=await findBranchById(_id);
    if(!branch)
    {
        return null;
    }
    return await branch.deleteOne();
}

module.exports={
    creatBranch,
    findBranchById,
    getBranches,
    updateBranch,
    deleteBranch
}