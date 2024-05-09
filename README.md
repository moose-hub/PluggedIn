![Banner](public/banner.png)

<p align="center">
<span style="color: #8962ed;"><strong>Stakeholders</strong>:</span>
<strong>Nathan</strong> ·
<strong>Nasa</strong>
</p>
<br/>
<p align="center">
<span style="color: #8962ed;"><strong>Authors</strong>:</span>
<strong>Elizabath Salamai</strong> ·
<strong>Mohamedamin Abdile</strong> ·
<strong>Rhys Postans</strong> ·
<strong>Mugheesa Ahmed</strong> ·
<strong>James Hearn</strong>
<br/>
</p>
<br/>
<p align="center">
<strong><a href="https://plugged-in-tan.vercel.app/create-music" style="color: #8962ed;">Click icon to view the app</a></strong>
</p>

<p align="center">
<a href="https://plugged-in-tan.vercel.app/create-music">
    <img src="public/plug.png" alt="View our app" style="width:100px;height:auto;">
</a>
</p>




# Contents
- <a href="#Problem Statement" style="color: #8962ed;">Problem Statement</a>
- <a href="#Solution" style="color: #8962ed;">Solution</a>
- <a href="#Tech Stack" style="color: #8962ed;">Tech Stack</a>
- <a href="#" style="color: #8962ed;"></a>
- <a href="#" style="color: #8962ed;"></a>
- <a href="#" style="color: #8962ed;"></a>
- <a href="#" style="color: #8962ed;"></a>


## Problem Statement

You can view a fully working demo at [demo-nextjs-with-supabase.vercel.app](https://demo-nextjs-with-supabase.vercel.app/).

## Solution

Vercel deployment will guide you through creating a Supabase account and project.

After Tech Stack of the Supabase integration, all relevant environment variables will be assigned to the project so the deployment is fully functioning.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&project-name=nextjs-with-supabase&repository-name=nextjs-with-supabase&demo-title=nextjs-with-supabase&demo-description=This%20starter%20configures%20Supabase%20Auth%20to%20use%20cookies%2C%20making%20the%20user's%20session%20available%20throughout%20the%20entire%20Next.js%20app%20-%20Client%20Components%2C%20Server%20Components%2C%20Route%20Handlers%2C%20Server%20Actions%20and%20Middleware.&demo-url=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2F&external-id=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-supabase&demo-image=https%3A%2F%2Fdemo-nextjs-with-supabase.vercel.app%2Fopengraph-image.png&integration-ids=oac_VqOgBHqhEoFTPzGkPd7L0iH6)

The above will also clone the Starter kit to your GitHub, you can clone that locally and develop locally.

If you wish to just develop locally and not deploy to Vercel, [follow the steps below](#clone-and-run-locally).

## Clone and run locally

1. You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2. Create a Next.js app using the Supabase Starter template npx command

   ```bash
   npx create-next-app -e with-supabase
   ```

3. Use `cd` to change into the app's directory

   ```bash
   cd name-of-new-app
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [Supabase GitHub org](https://github.com/supabase/supabase/issues/new/choose).

## More Supabase examples

- [Next.js Subscription Payments Starter](https://github.com/vercel/nextjs-subscription-payments)
- [Cookie-based Auth and the Next.js 13 App Router (free course)](https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF)
- [Supabase Auth and the Next.js App Router](https://github.com/supabase/supabase/tree/master/examples/auth/nextjs)
