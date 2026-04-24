import re

files = [
    r'c:\Users\LC\Desktop\last bite1\restaurant.html',
    r'c:\Users\LC\Desktop\last bite1\customer.html',
    r'c:\Users\LC\Desktop\last bite1\ngo.html',
    r'c:\Users\LC\Desktop\last bite1\farmer.html',
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add Events and Delivery links if not already present
    if 'events.html' not in content:
        # Find farmer.html link and add Events before it, Delivery after NGO
        content = content.replace(
            '<li><a href="farmer.html">Farmer Portal</a></li>',
            '<li><a href="events.html">Events</a></li>\n    <li><a href="delivery.html">Delivery</a></li>\n    <li><a href="farmer.html">Farmer Portal</a></li>'
        )
        # Also try alternate text
        content = content.replace(
            '<li><a href="farmer.html">Farmer</a></li>',
            '<li><a href="events.html">Events</a></li>\n    <li><a href="delivery.html">Delivery</a></li>\n    <li><a href="farmer.html">Farmer</a></li>'
        )
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated:', fpath)
    else:
        print('Already has events.html:', fpath)
