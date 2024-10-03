'use client'

import Navbar from "@/components/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppDispatch, RootState } from "@/redux/store"
import { getUserDetailAsync } from "@/redux/usersSlice"
import { PlusCircle, FileText, Eye, Calendar, Edit, Trash2 } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
interface FeedbackType {
  title: string, 
  submitted: number, 
  viewed: number, 
  datePublished: string
}

export default function UserFeedback() {

  return (
      <>
      <Navbar/>


    <div className="container mx-auto mt-14 p-6">
      <Tabs defaultValue="existing" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="existing">Existing Forms</TabsTrigger>
          <TabsTrigger value="new">New Form</TabsTrigger>
        </TabsList>
        <TabsContent value="existing">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeedbackFormCard
              title="Feedback Form"
              submitted={0}
              viewed={0}
              datePublished="Not published yet"
            />
            {/* Add more FeedbackFormCard components here for additional forms */}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Create New Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter form name" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" placeholder="Enter form description" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
      </>
  )
}

function FeedbackFormCard({ title, submitted, viewed, datePublished }: FeedbackType) {
  const { userDetails, loading } = useSelector(
    (state: RootState) => state.userDetails
  );
  const router = useRouter();
  const { userId } = router.query;
  const dispatch : AppDispatch = useDispatch()

  useEffect(() => {
    if (userId && typeof(userId) === 'number') {
      dispatch(getUserDetailAsync(userId));
    }
  }, [userId]);

  console.log('userId', userDetails)
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Submitted: {submitted}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Viewed: {viewed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Date Published: {datePublished}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={()=>router.push(`/${userId}/new-summary-page`) } variant="outline" size="sm">
          View Submissions
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Edit onClick={()=>router.push(`/${userId}/new-form-builder`) } className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}