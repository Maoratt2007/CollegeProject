const Branch=require('../modules/branch');
//add category for method post
const creatBranch=async (name,address,phoneNumber,activityTime, manager,is_show_branch)=>{
    const branch =new Branch({
        name:name,
        address:address,
        phoneNumber:phoneNumber,
        activityTime:activityTime,
        manager: manager,
        is_show_branch:is_show_branch
    });
    return await branch.save();

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
const updateBranch=async(_id,name,address,phoneNumber,activityTime, manager,is_show_branch)=>{
    const branch=await findBranchById(_id);
    if(!branch)
    {
        return null;
    }
    branch.name=name;
    branch.address=address;
    branch.phoneNumber=phoneNumber;
    branch.activityTime=activityTime;
    branch.manager= manager;
    branch.is_show_branch=is_show_branch;
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
const getBranchShow= async(is_show_branch)=>{
    return await Branch.find({is_show_branch});
}

module.exports={
    creatBranch,
    findBranchById,
    getBranches,
    updateBranch,
    deleteBranch,
    getBranchShow
}

