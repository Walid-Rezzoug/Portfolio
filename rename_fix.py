import os

files_to_rename = {
    r"d:\portfolio\Portfolio\src\components\hero.jsx": r"d:\portfolio\Portfolio\src\components\Hero.jsx",
    r"d:\portfolio\Portfolio\src\components\Exprience.jsx": r"d:\portfolio\Portfolio\src\components\Experience.jsx"
}

for src, dst in files_to_rename.items():
    if os.path.exists(src):
        # Rename to temp first to avoid case-insensitivity issues on Windows
        temp = src + ".temp"
        os.rename(src, temp)
        os.rename(temp, dst)
        print(f"Renamed {src} to {dst}")
    else:
        print(f"File not found: {src}")
