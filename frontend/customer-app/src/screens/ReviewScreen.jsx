import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/** ReviewScreen — Đánh giá tài xế 1–5 sao */
const ReviewScreen = ({ navigation }) => {
  const [rating, setRating] = React.useState(0);

  const handleSubmit = () => {
    // TODO: Gọi review-service API
    navigation.navigate('Booking');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đánh giá chuyến đi</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star && styles.activeStar]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gửi đánh giá</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  stars: { flexDirection: 'row', marginBottom: 32 },
  star: { fontSize: 48, color: '#ddd', marginHorizontal: 4 },
  activeStar: { color: '#FBBC04' },
  button: { backgroundColor: '#1a73e8', padding: 16, borderRadius: 10, width: '80%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default ReviewScreen;
