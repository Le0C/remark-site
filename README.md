# unified site builder

unified processor to build html & css from markdown & scss.

# installation

1. npm install
2. Add your markdown content to /content directory
3. Define a build directory & other settings in the .env file _(optional)_
4. npm run build
5. View the resulting html in the browser.

# usage

The program will look in the content folder for markdown files.

It will render any markdown files it finds into html, using unified.

We can style this html using a theme:

1. Create a file `themeName.theme.scss` in the scss directory.
2. Create a file `fileName.themeName.md` in the content directory.

The resulting html will now be styled according to the theme stylesheet.

You can specify an arbitrary directory structure:

```
content
    index.md
    /foo
        bar.md
```
which will be respected by the processor.
