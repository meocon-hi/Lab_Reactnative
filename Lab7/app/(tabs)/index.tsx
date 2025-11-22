import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const storyData = {
  start: "t1",
nodes: {
  t1: {
    id: "t1",
    text: "Bạn tỉnh dậy trong một khu rừng rậm mù sương, tiếng chim rừng và côn trùng vang vọng khắp nơi. Trước mặt bạn có hai con đường: một dẫn sâu vào rừng, ánh sáng yếu ớt chiếu qua tán lá; con còn lại dẫn tới một ngọn đồi có khói mờ bay lên từ xa.",
    choices: [
      { text: "Đi vào rừng sâu", next: "t2" },
      { text: "Leo lên ngọn đồi khói mờ", next: "t3" },
    ],
  },
  t2: {
    id: "t2",
    text: "Bước vào rừng, bạn phát hiện một cây cổ thụ khổng lồ, phía gốc cây là một cánh cửa gỗ nhỏ, như thể dẫn vào thế giới khác. Không khí xung quanh rung lên như có sức sống riêng.",
    choices: [
      { text: "Mở cánh cửa nhỏ", next: "t4" },
      { text: "Bỏ qua cây cổ thụ, tiếp tục đi sâu", next: "t5" },
    ],
  },
  t3: {
    id: "t3",
    text: "Trên đỉnh đồi, khói mờ từ một ngôi nhà gỗ cổ hiện ra. Cửa sổ hắt ra ánh sáng ấm áp. Bạn nghe thấy tiếng người thì thầm gọi tên bạn từ bên trong, mời bạn đến gần.",
    choices: [
      { text: "Gõ cửa nhà gỗ", next: "t6" },
      { text: "Quan sát xung quanh trước khi đến gần", next: "t7" },
    ],
  },
  t4: {
    id: "t4",
    text: "Cánh cửa mở ra dẫn bạn vào một hang động phát sáng màu xanh lục. Ở giữa hang là một hồ nước pha lê, phản chiếu ánh sáng lung linh. Một sinh vật kỳ bí xuất hiện, cười với bạn và trao cho bạn một viên ngọc phát sáng mạnh mẽ. Bạn nhận ra rằng đây là món quà từ rừng, biểu tượng của trí tuệ và dũng cảm. Bạn bước ra khỏi hang với trái tim nhẹ nhõm, cảm giác trưởng thành và mạnh mẽ hơn bao giờ hết. 🌿✨ (KẾT DÀI)",
    choices: [],
  },
  t5: {
    id: "t5",
    text: "Bạn tiếp tục đi sâu vào rừng, qua nhiều lối rẽ và cây cối dày đặc. Cuối cùng, bạn gặp một con sông rộng, không có cầu. Khi đang loay hoay tìm đường, mặt trời bắt đầu lặn, rừng rậm trở nên u ám. Bạn tìm thấy một tảng đá lớn để nghỉ ngơi và nhận ra rằng hành trình này là bài học về kiên nhẫn và quan sát. Dù chưa tìm ra lối ra, bạn cảm thấy mình đã học được nhiều điều về bản thân và thế giới xung quanh. 🌌 (KẾT DÀI)",
    choices: [],
  },
  t6: {
    id: "t6",
    text: "Cửa mở, một người lạ mặc áo choàng bạc bước ra và mời bạn vào nhà. Bên trong, bạn thấy một bàn tròn với bản đồ, sách cổ và một chiếc đèn kỳ diệu. Người lạ kể về một kho báu bị lãng quên trong rừng và nhờ bạn giúp đỡ. Sau một hành trình đầy thử thách, bạn cùng người lạ tìm ra kho báu, học được nhiều phép thuật cổ xưa và trở thành người bảo vệ rừng huyền bí. 🏡✨ (KẾT DÀI)",
    choices: [],
  },
  t7: {
    id: "t7",
    text: "Bạn quan sát xung quanh và phát hiện ra rằng ngôi nhà gỗ được bảo vệ bởi nhiều bẫy và cạm bẫy. Nhận ra sự nguy hiểm, bạn rút lui về phía rừng, tìm thấy một con đường bí mật dẫn ra ngoài. Dù không vào được nhà gỗ, bạn học được giá trị của sự cẩn trọng và trí tuệ trong mọi hành trình. Trở lại với thế giới bên ngoài, bạn mang theo kinh nghiệm và sự khôn ngoan quý giá. 🌄 (KẾT DÀI)",
    choices: [],
  },
}

};

export default function App() {
  const [currentId, setCurrentId] = useState(storyData.start);

  const node = storyData.nodes[currentId];
  const isEnding = node.choices.length === 0;

  const restart = () => setCurrentId(storyData.start);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.storyText}>{node.text}</Text>
      </View>

      <View style={styles.choices}>
        {isEnding ? (
          <TouchableOpacity style={styles.button} onPress={restart}>
            <Text style={styles.buttonText}>🔄 Chơi lại</Text>
          </TouchableOpacity>
        ) : (
          node.choices.map((choice, i) => (
            <TouchableOpacity
              key={i}
              style={styles.button}
              onPress={() => setCurrentId(choice.next)}
            >
              <Text style={styles.buttonText}>{choice.text}</Text>
            </TouchableOpacity>
          ))
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#333",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  storyText: {
    color: "white",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },
  choices: {
    marginTop: 10,
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 14,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
