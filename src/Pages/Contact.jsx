import React from 'react'
import { Button, Drawer, Label, Textarea, TextInput,Blockquote } from "flowbite-react";
import { useState } from "react";
import { HiEnvelope } from "react-icons/hi2";

const Contact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="min-h-[50vh] items-center justify-center grid grid-cols-1 md:grid-cols-2 md:gap-6">
        <Button onClick={() => setIsOpen(true)}>Show contact form</Button>
      
      <Blockquote className="mb-3">
          <p className="text-xl font-semibold italic text-gray-900 dark:text-white">
            " BloggerHunt is just awesome. It contains many features and easy to maintain. Perfect choice for your blog application. Please feel free to contact us "
          </p>
        </Blockquote>
      </div>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="CONTACT US" titleIcon={HiEnvelope} />
        <Drawer.Items>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="email" className="mb-2 block">
                Your email
              </Label>
              <TextInput id="email" name="email" placeholder="name@company.com" type="email" />
            </div>
            <div className="mb-6">
              <Label htmlFor="subject" className="mb-2 block">
                Subject
              </Label>
              <TextInput id="subject" name="subject" placeholder="Let us know how we can help you" />
            </div>
            <div className="mb-6">
              <Label htmlFor="message" className="mb-2 block">
                Your message
              </Label>
              <Textarea id="message" name="message" placeholder="Your message..." rows={4} />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Send message
              </Button>
            </div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:nishanthmohan2k15@gmail.com" className="hover:underline">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:6369303696" className="hover:underline">
                636-930-3696
              </a>
            </p>
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  )
}

export default Contact