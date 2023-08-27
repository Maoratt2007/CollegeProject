const branch = require('../modules/branch');
const BranchService= require('../services/branchservice');

const createBranch=async(req,res)=>{
    const new_branch= await BranchService.creatBranch(req.body.name,req.body.address,req.body.phoneNumber,req.body.activityTime,req.body.manager,req.body.is_show_branch,req.body.lng,req.body.lat);
    console.log(new_branch);
    res.json(new_branch);
}

const getBranches=async(req,res)=>{
    let branch;
    if(req.query.is_show_branch)
    {
        branch=await BranchService.getBranchShow(req.query.is_show_branch);
    }

    else{
       branch= await BranchService.getBranches();
       if(!branch)
       {
           res.status(404).json({errors:['branch was not found']})
   
       }
    }
    res.json(branch);   
}

const findBranchById=async(req,res)=>{
    const branch= await BranchService.findBranchById(req.params.id);
    if(!branch)
    {
         res.status(404).json({errors:['branch was not found']})
    }
    res.json(branch);
}

const deleteBranch=async(req,res)=>{

    const branch= await BranchService.deleteBranch(req.params.id);
    if(!branch)
    {
        return res.status(404).json({errors:['branch was not found']})
    }
    res.send();
}

const updateBranch=async(req,res)=>{

    if(!req.body.name)
    {
        res.status(400).json({errors:['you dont have name to your branch']});
    }

    if(!req.body.address)
    {
        res.status(400).json({errors:['you dont have price to branch']});
    }

    if(!req.body.phoneNumber)
    {
        res.status(400).json({errors:['you dont have the phone-number of branch']});
    }

    if(!req.body.activityTime)
    {
        res.status(400).json({errors:['you dont have the actuivityTime of branch']});
    }

    if(!req.body.manager)
    {
        res.status(400).json({errors:['you dont have the manager of branch']});
    }


    try{
        const branch= await BranchService.updateBranch(req.params.id, req.body.name,req.body.address,req.body.phoneNumber,req.body.activityTime,req.body.manager,req.body.is_show_branch,req.body.lng,req.body.lat);
        if(!branch)
        {
            return res.status(404).json({errors:['branch was not found']})
        }
        res.json(branch);

    }
    catch(e){
        return res.status(400).json({errors:e.message})
    }


}

module.exports={
    createBranch,
    getBranches,
    findBranchById,
    deleteBranch,
    updateBranch
}