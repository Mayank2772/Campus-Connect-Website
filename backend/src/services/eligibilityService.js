const checkEligibility = (
    student,
    drive
) => {

    const rules = drive.eligibility;

    // CGPA
    if (
        student.cgpa <
        rules.minimumCGPA
    ) {

        return {
            eligible: false,
            reason:
                `Minimum CGPA required is ${rules.minimumCGPA}`
        };
    }

    // Backlogs
    if (
        student.backlogs >
        rules.maximumBacklogs
    ) {

        return {
            eligible: false,
            reason:
                `Maximum allowed backlogs are ${rules.maximumBacklogs}`
        };
    }

    // Branch
    if (
        rules.eligibleBranches &&
        rules.eligibleBranches.length > 0
    ) {

        const studentBranch =
            student.branch.toLowerCase();

        const branches =
            rules.eligibleBranches.map(
                branch =>
                    branch.toLowerCase()
            );

        if (
            !branches.includes(studentBranch)
        ) {

            return {
                eligible: false,
                reason:
                    "Your branch is not eligible"
            };
        }
    }

    return {
        eligible: true,
        reason:
            "Student is eligible"
    };
};

module.exports =
    checkEligibility;