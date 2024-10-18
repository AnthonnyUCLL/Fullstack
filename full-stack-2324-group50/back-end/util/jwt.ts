import jwt from 'jsonwebtoken';

const generateJwtToken = ({rnummer, role}) : string => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer:"fullstack_app"}

    try {
        return jwt.sign({rnummer, role}, process.env.JWT_SECRET, options);
    } catch (error) {
        console.log(error)
        throw new Error('Error generating JWT token, see server log for details')
    }
};

export { generateJwtToken };
