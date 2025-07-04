import {createClient} from "@/utils/supabase/client"

type Props = {
    email: string
    password: string
}

export const signInWithEmail = async ({email,password}: Props) => {
    const supabase = createClient()
    const {data,error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    return {data,error}
}