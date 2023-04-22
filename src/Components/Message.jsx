import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"

function Message({text,uri,user="other"}) {
  return (
    
    <HStack   borderRadius={'base'} paddingX={user==='me'?4 : 2} paddingY={2}   bg={user==='other' && '#F5F5F5'} bgGradient={user==='me' && 'linear(to-l,#AEE2FF,  #6DA9E4)'} color={user==='me' && 'white'} alignSelf={user==="me" ? "flex-end" : "flex-start"}>
        

        {user==="other" &&   <Avatar src= {uri} />}
        
        <Text>{text}</Text>

        {user==="me" &&   <Avatar src= {uri} />}
       
    </HStack>
  )
}

export default Message
