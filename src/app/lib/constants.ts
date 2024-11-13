import { NavItem } from "../models/navIModel";
import { ImageItem } from "../models/imageModel";
import { PictureCarouselItem } from "../models/imageModel";
import { FormItem } from "../models/formModel";

const rowGrap = 5;
const rowHeight = 5;
const pageSize = 10;
const adminPageSize = 5;
const displayItems = 5;
const categories: string[] = ['Wordpress', 'HTML', 'Photography', 'UI', 'Mockups', 'Branding'];
const userUnknownImage = 'images/avatars/user-unknown.jpg'
const adminNavItems: NavItem[] = [
    {
        title: "Users",
        href: "/admin/users",
        children: []
    },
    {
        title: "Albums",
        href: "/admin/albums",
        children: []
    },
    {
        title: "Blogs",
        href: "/admin/blogs",
        children: []
    }
]

const navItems: NavItem[] = [
    {
        title: "Home",
        href: "/",
        children: []
    },
    {
        title: "Categories",
        href: "/categories",
        children: categories
    },
    {
        title: "Styles",
        href: "/styles",
        children: []
    },
    {
        title: "About",
        href: "/about",
        children: []
    },
    {
        title: "Contact",
        href: "/contact",
        children: []
    },
    {
        title: "Login",
        href: "/auth/login",
        children: []
    }
];

const offcanvasItems: NavItem[] = [
    {
        title: "Admin",
        href: "/admin/users",
        children: []
    },
    {
        title: "Home",
        href: "/",
        children: []
    },
    {
        title: "Categories",
        href: "/categories",
        children: categories
    },
    {
        title: "Styles",
        href: "/styles",
        children: []
    },
    {
        title: "About",
        href: "/about",
        children: []
    },
    {
        title: "Contact",
        href: "/contact",
        children: []
    }
];

const images: ImageItem[] = [
    {
        sourceLink: "images/thumbs/diagonal-building.jpg"
    },
    {
        sourceLink: "images/thumbs/ferris-wheel.jpg"
    },
    {
        sourceLink: "images/thumbs/concert.jpg",
        audioLink: "media/AirReview-Landmarks-02-ChasingCorporate.mp3"
    },
    {
        sourceLink: "images/thumbs/shutterbug.jpg"
    },
    {
        sourceLink: "images/thumbs/usaf-rocket.jpg"
    },
    {
        sourceLink: "images/thumbs/lighthouse.jpg"
    },
    {
        sourceLink: "images/thumbs/liberty.jpg"
    },
    {
        sourceLink: "images/thumbs/ottawa-bokeh.jpg"
    },
    {
        sourceLink: "images/thumbs/diagonal-pattern.jpg"
    }
];

const pictures: PictureCarouselItem[] = [
    {
        titlle: "Minimalism Never Goes Out of Style",
        content: ["September 06, 2016", "Naruto Uzumaki"],
        sourceLink: "images/thumbs/featured/featured-1.jpg",
        href: "/blog",
    },
    {
        titlle: "Enhancing Your Designs with Negative Space",
        content: ["August 29, 2016", "Sasuke Uchiha"],
        sourceLink: "images/thumbs/featured/featured-2.jpg",
        href: "/blog",
    },
    {
        titlle: "Music Album Cover Designs for Inspiration",
        content: ["August 27, 2016", "Naruto Uzumaki"],
        sourceLink: "images/thumbs/featured/featured-3.jpg",
        href: "/blog",
    }
];

const userImages: string[] = ['images/avatars/user-01.jpg', 'images/avatars/user-02.jpg', 'images/avatars/user-03.jpg', 'images/avatars/user-04.jpg', 'images/avatars/user-05.jpg'];

const blogCommentFields: FormItem = {
    fields: [
        {
            label: 'Your name',
            type: 'name',
            key: 'name'
        },
        {
            label: 'Your email',
            type: 'email',
            key: 'email'
        },
        {
            label: 'Your message',
            type: 'textarea',
            key: 'body'
        }
    ],
    buttonText: "Comment"
};

const loginFields: FormItem = {
    fields: [
        {
            label: 'Your email',
            type: 'email',
            key: 'email'
        },
        {
            label: 'Password',
            type: 'password',
            key: 'password'
        }
    ],
    displayType: "ColRow",
    buttonText: "Login"
};

const logoutFields: FormItem = {
    fields: [],
    buttonText: "Logout"
};

const footerFields: FormItem = {
    fields: [
        {
            label: 'Type & press enter',
            type: 'text',
            key: 'text'
        },
    ],
    buttonText: 'Enter'
}

export {
    rowGrap,
    rowHeight,
    adminNavItems,
    navItems,
    offcanvasItems,
    categories,
    images,
    pictures,
    userImages,
    blogCommentFields,
    loginFields,
    logoutFields,
    footerFields,
    pageSize,
    adminPageSize,
    displayItems,
    userUnknownImage
}