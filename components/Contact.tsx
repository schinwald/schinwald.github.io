import React, { useRef } from 'react'
import styles from '@styles/modules/components/Contact.module.scss'
import { Button, Link, Input, TextArea } from '@components/primitives'
import { parseClassName } from '@utils/parsers'
import isEmail from 'validator/lib/isEmail'
import isAlpha from 'validator/lib/isAlpha'

type Props = {
    className?: string;
}

export const Contact: React.FC<Props> = ({className}) => {
    const ref = useRef<HTMLFormElement>(null)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    function validateFirstName() {
        if (firstNameRef.current == null) return

        const firstName = firstNameRef.current;

        firstName.setCustomValidity('')

        if (isAlpha(firstName.value, 'en-US', { ignore: '-\'' }) == false) {
            firstName.setCustomValidity('Not a valid first name')
        }

        firstName.reportValidity()
    }

    function validateLastName() {
        if (lastNameRef.current == null) return

        const lastName = lastNameRef.current;

        lastName.setCustomValidity('')

        if (isAlpha(lastName.value, 'en-US', { ignore: '-\'' }) == false) {
            lastName.setCustomValidity('Not a valid last name')
        }

        lastName.reportValidity()
    }

    function validateEmail() {
        if (emailRef.current == null) return

        const email = emailRef.current;

        email.setCustomValidity('')

        if (email.value === 'contact@schinwald.dev') {
            email.setCustomValidity('Use your own email address')
        }

        if (!isEmail(email.value)) {
            email.setCustomValidity('Not a valid email address')
        }

        email.reportValidity()
    }

    function onSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const form = ref.current! // if we've made it this far then the form is not undefined
        const formData = new FormData(form)

        validateFirstName()
        validateLastName()
        validateEmail()

        if (form.checkValidity() == false) return

        fetch('/api/contact', {
                method: 'POST',
                body: formData
            })
            .then((response: any) => {
                if (ref.current) ref.current.reset()
            })
            .catch((error: any) => {
                console.error(error)
            })
    }

    return <form ref={ref} className={[styles["contact"], parseClassName(className)].filter(Boolean).join(" ")}>
        <h2 className={styles["title"]}>Looking to chat?</h2>
        <p className={styles["description"]}>Send me an email at <Link href="mailto:contact@schinwald.dev" icon={{ type: "fontawesome", name: "link", position: "left" }} underline={true}>contact@schinwald.dev</Link> or fill in the form below:</p>
        <Input ref={firstNameRef} className={styles["first"]} name="first" placeholder="First Name" inputMode='text' onChange={() => validateFirstName()} />
        <Input ref={lastNameRef} className={styles["last"]} name="last" placeholder="Last Name" inputMode='text' onChange={() => validateLastName()} />
        <Input ref={emailRef} className={styles["email"]} name="email" placeholder="Email Address" inputMode='email' onChange={() => validateEmail()} />
        <Input className={styles["subject"]} name="subject" placeholder="Subject" inputMode='text' />
        <TextArea className={styles["message"]} name="message" placeholder="Message" rows={4} inputMode='text' />
        <div className={styles["send"]}>
            <Button icon={{ type: "fontawesome", name: "envelope", position: "left"}} onClick={onSubmit}>
                Send
            </Button>
        </div>
    </form>
}