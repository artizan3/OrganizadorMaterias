package main;

import java.awt.GridLayout;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

public class main {

	public static void main(String[] args) {
		SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Draggable Component Example");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

            JPanel panel = new JPanel();
            panel.setLayout(null);

            ComponenteGrafico draggableComponent = new ComponenteGrafico();
            panel.add(draggableComponent);

            frame.setContentPane(panel);
            frame.setSize(400, 400);
            frame.setLocationRelativeTo(null);
            frame.setVisible(true);
        });
	}

}
