# 🔥 Fire Mods for Articulate Rise 360

**Fire Mods** is a lightweight and powerful add-on script created by [Discover eLearning Ltd](https://discoverelearning.com), designed to supercharge your Articulate Rise 360 courses with custom functionality and advanced interaction options.

This open source script allows you to inject enhanced features directly into your Rise projects post-publish — end users do not require anything extra to be able to see and interact with these add-ons.

---

## 🚀 Installation

1. Copy the `firemods.js` file into the `lib` folder of your **published** Rise 360 project.
2. Open the `index.html` file located in the **root** directory of your project.
3. Just before the closing `</html>` tag, insert the following line:

    ```html
    <script src="lib/firemods.js"></script>
    ```

4. Save the changes. That’s it!

You can now activate features from the top of the `firemods.js` file by changing configuration options from `false` to `true`, and customising values as needed. Comments in the file provide setup instructions for any features that require prior configuration within Rise.

---

## ✨ Features

Below is a full list of all configurable Fire Mods features:

### 📜 Scroll Trigger Actions

- Trigger JavaScript when a specific Rise block scrolls into view.
- Enable developer mode within the script to discover the IDs of visible blocks as you scroll.
- **Block ID Logging To Console** displays the Rise block type making it easier to identify the correct ID value for blocks.
- Choose to fire once or every time the block becomes visible.

### 🖼️ Text on Image Enhancements

- **Add Frosted Glass Effect** to the text box with blur and transparency.
- **Drop Shadow Styling** for further custom styling.
- **Staggered Parallax Scroll** animation.
- **Alternate Text Box Float** (left/right pattern).
- **Custom Headline Font** for text overlays.

### 📝 Reflection Blocks

Create interactive text entry blocks within Rise using the NOTE block type. 
After activating, just write the following text into the block:

```text
REFLECTION ID="REFLECT01" TITLE="..." INSTRUCTION="..."
```

- User responses are saved to browser local storage.
- **Centred alignment** option for layout.
- Customisable **Save Button Radius** and button text.

### 📋 Summary Shortcodes

Display previously saved reflection responses anywhere in your course using a shortcode:

```text
[REFLECT01]
```

- If no response has been saved, fallback text is shown.
- Default fallback text is customisable in the config.

### 🖼️ Custom Background Styling

- Apply a **fixed background colour** behind standard Rise content blocks.
- **Option to enable a custom image file as a custom background style** for enhanced visual appeal.
- Optionally overlay **grid lines**, with adjustable colour and spacing.
- Does not affect the behaviour of Text On Image blocks.

### 📖 Menu Customisations

- **Start with menu hidden**: Automatically collapses the sidebar menu on course load.
- **Modernise Menu Button**: Add blur, transparency, shadows, and hover scale to the menu toggle button.

### 🔘 Button Block Styling

- **Centre align button blocks**: Removes text description spacing and centres buttons within the block.
- Adjustable **button height** for consistency across devices.

### ➡️ Continue Button Tweaks

- **Rounded continue buttons**: Set your own button border radius.
- **Replace continue buttons with a horizontal line** after they are clicked (good for visual flow).

### 🔲 Custom Button Triggers

Trigger custom JavaScript by using a Rise Button Block:

1. In Rise, set the button **Destination** to *Link to a webpage*.
2. Enter a custom ID as the URL, e.g. `MYSCRIPT01`.
3. In the script config, add:

    ```js
    {
      id: 'MYSCRIPT01',
      script: 'console.log("Hello!");',
      confetti: true // Optional celebratory effect!
    }
    ```

- The script will run when the button is clicked.
- Optionally display **confetti** as visual feedback.

### 🎉 Confetti Display

- Enable celebratory confetti effects when a button is clicked.
- Customise colours, speed, particle count, and launch position.
- Confetti is only loaded if at least one button has it enabled.

---

## 💡 Customising Your Copy

This script is open source and licensed under the **GPL-3.0** license.

If a feature doesn’t quite suit your project, or you have something completely new in mind, feel free to throw the script into a large language model (LLM) and tailor it to your own needs!

You are welcome to submit issues or pull requests via GitHub if you'd like to contribute improvements or ideas.

---

## 📜 License

[GPL-3.0 License](https://www.gnu.org/licenses/gpl-3.0.en.html)
© Discover eLearning Ltd

---

## 👋 Created by

[Discover eLearning Ltd](https://discoverelearning.com)  