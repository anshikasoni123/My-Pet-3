class Form
{
    constructor()
    {
       this.input = createInput("Write Pet Name Here")
       this.button = createButton("Confirm")
    }

    display()
    {
        this.input.position(200, 150);
        this.button.position(300, 200);

        this.button.mousePressed(
            ()=>
        {
           this.input.hide();
           this.button.hide();
        })
        
    }
}