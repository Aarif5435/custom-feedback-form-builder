import prisma from "@/lib/prisma";



export async function verifyOtp(email: string, otpCode: string){
    const otp = await prisma.oTP.findFirst({
        where:{
            email,
            otpCode,
            isVerified: false,
            expiresAt: {
                gt: new Date()
            }

        }
    });

    if(!otp){
        throw new Error('Invalid or expired OTP');
    };

    await prisma.oTP.update({
        where: {id: otp.id},
        data: {isVerified: true},
    });

    return {ok: true, message: 'OTP verified'}

}