const express=require('express');
const router= express.Router();

const BranchController= require('../controllers/branchcontrol');
router.route('/')
    .get(BranchController.getBranches)
    .post(BranchController.createBranch)

    
router.route('/:id')
    .get(BranchController.findBranchById)
    .put(BranchController.updateBranch)
    .delete(BranchController.deleteBranch);

module.exports=router;